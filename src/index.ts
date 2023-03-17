import deepmerge from "deepmerge"
import { ConfigurationCompiler } from "./compiler"
import { FileReader } from "./readers/file-reader"
import { ObjectReader } from "./readers/object-reader"
import { ConfigurationReader, FileFormat, Dictionary, Source, Descriptor } from "./types"

interface Config {
  readers?: Dictionary<ConfigurationReader>
  fileFormats?: Dictionary<FileFormat>
}

export class Configurator {
  private readers: Dictionary<ConfigurationReader>
  private compiler: ConfigurationCompiler
  private container?: Descriptor

  constructor({ readers = {}, fileFormats = {} }: Config = {}) {
    this.readers = {
      ...readers,
      object: new ObjectReader(),
      file: new FileReader({ fileFormats })
    }
    this.compiler = new ConfigurationCompiler()
  }

  private getReader(type: string) {
    const reader = this.readers[type]
    if (!reader) {
      throw new Error(`[Configurator] No reader found for configuration type '${type}'`)
    }

    return reader
  }

  get(path: string) {
    if (!this.container) {
      return undefined
    }

    const fields = path.split(".")

    return this.container.resolve(fields, this.container)
  }

  async load(layers: Array<Source>) {
    const raw = await Promise.all(layers.map(({ type, value }) =>
      this.getReader(type).read(value)
    ))

    const flattened = raw.reduce((acc, next) => acc.concat(next), [])
    const combined = deepmerge.all<Dictionary<any>>(flattened)

    this.container = this.compiler.compile(combined)
  }
}

export default Configurator

import deepmerge from "deepmerge"
import { ConfigurationCompiler } from "./compiler"
import Container from "./container"
import { FileReader } from "./readers/file-reader"
import { ObjectReader } from "./readers/object-reader"
import { ConfigurationReader, FileFormat, Dictionary, Source, Func } from "./types"

interface Config {
  readers?: Dictionary<ConfigurationReader>
  fileFormats?: Dictionary<FileFormat>
  funcs?: Dictionary<Func>
  environment?: Dictionary<any>
}

export class Configurator {
  private readers: Dictionary<ConfigurationReader>
  private compiler: ConfigurationCompiler
  private funcs: Dictionary<(x: string) => any>
  private container?: Container

  constructor({ readers = {}, fileFormats = {}, funcs = {}, environment }: Config = {}) {
    this.readers = {
      ...readers,
      object: new ObjectReader(),
      file: new FileReader({ fileFormats })
    }

    const env = environment || process.env
    this.funcs = {
      ...funcs,
      env: (x: string) => env[x]
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

    return this.container.get(fields)
  }

  async load(layers: Array<Source>) {
    const raw = await Promise.all(layers.map(({ type, value }) =>
      this.getReader(type).read(value)
    ))

    const flattened = raw.reduce((acc, next) => acc.concat(next), [])
    const combined = deepmerge.all<Dictionary<any>>(flattened)

    this.container = new Container({
      root: this.compiler.compile(combined),
      funcs: this.funcs
    })
  }
}

export default Configurator

import deepmerge from "deepmerge"
import { FileReader } from "./readers/file-reader"
import { ObjectReader } from "./readers/object-reader"
import { ConfigurationReader, FileFormat, Dictionary, Source } from "./types"

interface Config {
  readers?: Dictionary<ConfigurationReader>
  fileFormats?: Dictionary<FileFormat>
}

export class Configurator {
  private readers: Dictionary<ConfigurationReader>

  constructor({ readers = {}, fileFormats = {} }: Config = {}) {
    this.readers = {
      ...readers,
      object: new ObjectReader(),
      file: new FileReader({ fileFormats })
    }
  }

  private getReader(type: string) {
    const reader = this.readers[type]
    if (!reader) {
      throw new Error(`[Configurator] No reader found for configuration type '${type}'`)
    }

    return reader
  }

  async resolve(layers: Array<Source>) {
    const raw = await Promise.all(layers.map(({ type, value }) =>
      this.getReader(type).read(value)
    ))

    const flattened = raw.reduce((acc, next) => acc.concat(next), [])

    const combined = deepmerge.all<Dictionary<any>>(flattened)

    return combined
  }
}

export default Configurator

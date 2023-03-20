import { FileReader } from "./file-reader"
import { ObjectReader } from "./object-reader"
import { ConfigurationReader, FileFormat, Dictionary, Source } from "../types"

interface Config {
  sourceTypes: Dictionary<ConfigurationReader>
  fileFormats: Dictionary<FileFormat>
}

export class Reader {
  private sourceTypes: Dictionary<ConfigurationReader>

  constructor({ sourceTypes, fileFormats }: Config) {
    this.sourceTypes = {
      ...sourceTypes,
      object: new ObjectReader(),
      file: new FileReader({ fileFormats })
    }
  }

  async read(source: Source) {
    const sourceReader = this.sourceTypes[source.type]
    if (!sourceReader) {
      throw new Error(`[Configurator] No reader found for configuration type '${source.type}'`)
    }

    return sourceReader.read(source.value)
  }
}

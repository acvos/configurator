import fs from "fs"
import path from "path"
import { glob } from 'glob'
import { ConfigurationReader, Deserializer, Dictionary } from "../types"

interface Config {
  deserializers: Dictionary<Deserializer>
}

export class FileReader implements ConfigurationReader {
  private deserializers: Dictionary<Deserializer>

  constructor({ deserializers }: Config) {
    this.deserializers = deserializers
  }

  private readFile(fileName: string) {
    const extension = path.extname(fileName)

    const parser = this.deserializers[extension]
    if (!parser) {
      throw new Error(`[Configurator] Unable to process file ${fileName}: unknown file type ${extension}`)
    }

    const content = fs.readFileSync(fileName, { encoding: "utf-8" })

    return parser.parse(content)
  }

  async read(pattern: string) {
    const fileNames = await glob(pattern, { stat: true, withFileTypes: true })
    const fileContents = fileNames
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(x => x.fullpath())
      .map(this.readFile.bind(this))

    return fileContents
  }
}

import fs from "fs"
import path from "path"
import { glob } from 'glob'
import { JsonFileFormat } from "./file-formats/json"
import { YamlFileFormat } from "./file-formats/yaml"
import { ConfigurationReader, FileFormat, Dictionary } from "../types"

interface Config {
  fileFormats: Dictionary<FileFormat>
}

export class FileReader implements ConfigurationReader {
  private fileFormats: Dictionary<FileFormat>

  constructor({ fileFormats }: Config) {
    const yamlFileFormat = new YamlFileFormat()

    this.fileFormats = {
      ...fileFormats,
      ".json": new JsonFileFormat(),
      ".yaml": yamlFileFormat,
      ".yml": yamlFileFormat
    }
  }

  private readFile(fileName: string) {
    const extension = path.extname(fileName)

    const parser = this.fileFormats[extension]
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

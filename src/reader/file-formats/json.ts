import { FileFormat } from "../../types"

export class JsonFileFormat implements FileFormat {
  parse(source: string): object {
    return JSON.parse(source)
  }
}

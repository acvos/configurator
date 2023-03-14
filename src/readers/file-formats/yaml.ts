import yaml from "yaml"
import { FileFormat } from "../../types"

export class YamlFileFormat implements FileFormat {
  parse(source: string): object {
    return yaml.parse(source)
  }
}

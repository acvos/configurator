import yaml from "yaml"
import { Deserializer } from "../types"

export class YamlDeserializer implements Deserializer {
  parse(source: string): object {
    return yaml.parse(source)
  }
}

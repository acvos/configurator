import ini from "ini"
import { Deserializer } from "../types"

export class IniDeserializer implements Deserializer {
  parse(source: string): object {
    return ini.parse(source)
  }
}

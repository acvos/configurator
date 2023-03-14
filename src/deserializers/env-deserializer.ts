import { parse } from "envfile"
import { Deserializer } from "../types"

export class EnvDeserializer implements Deserializer {
  parse(source: string): object {
    return parse(source)
  }
}

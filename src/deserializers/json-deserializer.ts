import { Deserializer } from "../types"

export class JsonDeserializer implements Deserializer {
  parse(source: string): object {
    return JSON.parse(source)
  }
}

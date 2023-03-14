import { ConfigurationReader } from "../types"

export class ObjectReader implements ConfigurationReader {
  async read(source: object) {
    return [source]
  }
}

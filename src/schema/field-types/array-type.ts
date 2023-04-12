import { Schema } from "../../types"

interface Config {
  required: boolean
  itemType?: Schema
}

export class ArrayType implements Schema {
  private items: Array<Schema> = []

  constructor(readonly name: string, private config: Config) {}

  addItem(field: Schema) {
    this.items.push(field)
  }

  validate(input: Array<any>) {
    if (this.config.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (!(input instanceof Array)) {
      throw new Error(`Validation error: ${this.name} must be an array, ${typeof input} provided`)
    }

    return input
  }

  getChild(key: string): Schema {
    return this.items[parseInt(key)] || this.config.itemType
  }
}

import { Schema } from "../../types"

export class ArrayType implements Schema {
  constructor(readonly name: string, private items: Schema, private required: boolean) {}

  validate(input: Array<any>): Array<any> {
    if (this.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (!(input instanceof Array)) {
      throw new Error(`Validation error: ${this.name} must be an array, ${typeof input} provided`)
    }

    return input
  }

  getChild(key: string): Schema {
    return this.items
  }
}

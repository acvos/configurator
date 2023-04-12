import isNumber  from "is-number"
import { Schema } from "../../types"

interface Config {
  required: boolean
}

export class NumberType implements Schema {
  constructor(readonly name: string, private config: Config) {}

  validate(input: any) {
    if (this.config.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (!isNumber(input)) {
      throw new Error(`Validation error: ${this.name} must be a number, ${typeof input} provided`)
    }

    return typeof input === "number" ? input : parseFloat(input)
  }

  getChild(key: string): Schema {
    throw new Error(`Validation error: leaf schema node (${this.name}) cannot have children, ${key} requested`)
  }
}

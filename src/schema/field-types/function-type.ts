import { Schema } from "../../types"

export class FunctionType implements Schema {
  constructor(readonly name: string, private required: boolean) {}

  validate(input: any) {
    if (this.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (typeof input !== "function") {
      throw new Error(`Validation error: ${this.name} must be a function, ${typeof input} provided`)
    }

    return input
  }

  getChild(key: string): Schema {
    throw new Error(`Validation error: leaf schema node (${this.name}) cannot have children, ${key} requested`)
  }
}

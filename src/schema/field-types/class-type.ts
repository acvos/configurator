import { Schema } from "../../types"

interface Config {
  required: boolean
}

export class ClassType implements Schema {
  constructor(readonly name: string, private config: Config) {}

  validate(input: any) {
    if (this.config.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (typeof input !== "function" || !/^class\s/.test(Function.prototype.toString.call(input))) {
      throw new Error(`Validation error: ${this.name} must be a class, ${typeof input} provided`)
    }

    return input
  }

  getChild(key: string): Schema {
    throw new Error(`Validation error: leaf schema node (${this.name}) cannot have children, ${key} requested`)
  }
}

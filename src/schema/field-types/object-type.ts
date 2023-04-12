import { Dictionary, Schema } from "../../types"

interface Config {
  required: boolean
}

export class ObjectType implements Schema {
  private fields: Dictionary<Schema> = {}

  constructor(readonly name: string, private config: Config) {}

  addField(name: string, field: Schema) {
    this.fields[name] = field
  }

  validate(input: any) {
    if (this.config.required && !input) {
      throw new Error(`Validation error: ${this.name} is required, but ${input} value provided`)
    }

    if (typeof input !== "object") {
      throw new Error(`Validation error: ${this.name} must be an object, ${typeof input} provided`)
    }

    const formatted = {...input}
    for (const expectedKey of Object.keys(this.fields)) {
      formatted[expectedKey] = input[expectedKey] || undefined
    }

    return formatted
  }

  getChild(key: string): Schema {
    if (!this.fields[key]) {
      throw new Error(`Validation error: unrecognized key: ${this.name}.${key}`)
    }

    return this.fields[key]
  }
}

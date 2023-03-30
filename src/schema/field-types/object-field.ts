import { Dictionary, Schema, ValidationResponse } from "../../types"
import { mergeValidationResponses } from "../merge-validation-responses"

export class ObjectField implements Schema {
  constructor(readonly name: string, private fields: Dictionary<Schema>, private required: boolean) {}

  addField(name: string, field: Schema) {
    this.fields[name] = field
  }

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (typeof input !== "object") {
      return { valid: false, comment: `Field ${this.name} must be an object, ${typeof input} provided` }
    }

    const results = []
    for (const givenKey of Object.keys(input)) {
      if (!this.fields[givenKey]) {
        results.push({ valid: false, comment: `Unrecognized field: ${this.name}.${givenKey}` })
      }
    }

    for (const expectedKey of Object.keys(this.fields)) {
      results.push(this.fields[expectedKey].validate(input[expectedKey]))
    }

    return mergeValidationResponses(results)
  }
}

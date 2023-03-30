import { Schema, ValidationResponse } from "../../types"
import { mergeValidationResponses } from "../merge-validation-responses"

export class ArrayField implements Schema {
  constructor(readonly name: string, private items: Schema, private required: boolean) {}

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (!(input instanceof Array)) {
      return { valid: false, comment: `Field ${this.name} must be an array, ${typeof input} provided` }
    }

    const results = []
    for (const item of input) {
      results.push(this.items.validate(item))
    }

    return mergeValidationResponses(results)
  }
}

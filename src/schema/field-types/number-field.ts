import isNumber  from "is-number"
import { Schema, ValidationResponse } from "../../types"

export class NumberField implements Schema {
  constructor(readonly name: string, private required: boolean) {}

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (!isNumber(input)) {
      return { valid: false, comment: `Field ${this.name} must be a number, ${typeof input} provided` }
    }

    return { valid: true, comment: "" }
  }
}

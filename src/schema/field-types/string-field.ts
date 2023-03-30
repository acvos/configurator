import { Schema, ValidationResponse } from "../../types"

export class StringField implements Schema {
  constructor(readonly name: string, private required: boolean) {}

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (typeof input === "object") {
      return { valid: false, comment: `Field ${this.name} must be a string, object provided` }
    }

    return { valid: true, comment: "" }
  }
}

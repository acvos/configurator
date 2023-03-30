import { Schema, ValidationResponse } from "../../types"

export class FunctionField implements Schema {
  constructor(readonly name: string, private required: boolean) {}

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (typeof input !== "function") {
      return { valid: false, comment: `Field ${this.name} must be a function, ${typeof input} provided` }
    }

    return { valid: true, comment: "" }
  }
}

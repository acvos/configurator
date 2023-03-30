import { Schema, ValidationResponse } from "../../types"

export class ClassField implements Schema {
  constructor(readonly name: string, private required: boolean) {}

  validate(input: any): ValidationResponse {
    if (this.required && !input) {
      return { valid: false, comment: `Field ${this.name} is required, but ${input} value provided` }
    }

    if (typeof input !== "function" || !/^class\s/.test(Function.prototype.toString.call(input))) {
      return { valid: false, comment: `Field ${this.name} must be a class, ${typeof input} provided` }
    }

    return { valid: true, comment: "" }
  }
}

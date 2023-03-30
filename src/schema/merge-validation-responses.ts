import { ValidationResponse } from "../types"

export const mergeValidationResponses = (xs: Array<ValidationResponse>): ValidationResponse => ({
  valid: xs.every(x => x.valid),
  comment: xs.map(x => x.comment).join("; ")
})

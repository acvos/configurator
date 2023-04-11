import { Schema } from "../../types"

export class AnyType implements Schema {
  constructor(readonly name: string) {}

  validate(input: any) {
    return input
  }

  getChild(key: string): Schema {
    return new AnyType(key)
  }
}

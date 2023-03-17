import { Descriptor } from "../../types"

export class ReferenceDescriptor implements Descriptor {
  private link: Array<string>

  constructor(value: string) {
    this.link = value.split(".")
  }

  resolve(fields: Array<string>, context: Descriptor) {
    return context.resolve([...this.link, ...fields], context)
  }
}

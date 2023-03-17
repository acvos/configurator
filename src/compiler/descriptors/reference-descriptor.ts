import { Context, Descriptor } from "../../types"

export class ReferenceDescriptor implements Descriptor {
  constructor(private link: Array<string>) {}

  resolve(fields: Array<string>, context: Context) {
    return context.get([...this.link, ...fields])
  }
}

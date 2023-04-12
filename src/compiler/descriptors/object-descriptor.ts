import { Context, Descriptor, Dictionary } from "../../types"
import { map } from "../../map"

export class ObjectDescriptor implements Descriptor {
  constructor(private content: Dictionary<Descriptor>) {}

  resolve([field, ...rest]: Array<string>, context: Context) {
    if (field) {
      return this.content[field].resolve(rest, context)
    }

    return map(x => x.resolve([], context), this.content)
  }
}

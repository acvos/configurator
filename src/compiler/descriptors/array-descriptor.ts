import { Context, Descriptor } from "../../types"

export class ArrayDescriptor implements Descriptor {
  constructor(private content: Array<Descriptor>) {}

  resolve(fields: Array<string>, context: Context) {
    if (fields.length > 0) {
      throw new Error(`[Configurator] Getting deep field (${fields.join(".")}) from arrays is not supported`)
    }

    return this.content.map(x => x.resolve([], context))
  }
}

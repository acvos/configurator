import { map } from "../../map"
import { Descriptor, Dictionary } from "../../types"

export class TemplateDescriptor implements Descriptor {
  constructor(private template: string, private references: Dictionary<Descriptor>) {}

  resolve(fields: Array<string>, context: Descriptor) {
    if (fields.length > 0) {
      throw new Error(`Getting deep field (${fields.join(".")}) from primitives is not supported`)
    }

    let res = this.template
    map(
      (x, name) => { res = res.replace(name, x.resolve([], context)) },
      this.references
    )

    return res
  }
}

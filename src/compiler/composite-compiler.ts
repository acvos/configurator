import { Compiler, Descriptor, Instantiable, Schema } from "../types"
import { map } from "../map"

export class CompositeCompiler implements Compiler {
  constructor(private rootCompiler: Compiler, private nodeClass: Instantiable<Descriptor>) {}

  compile(input: any, schema: Schema) {
    const content = map(
      (x, key) => this.rootCompiler.compile(x, schema.getChild(key)),
      schema.validate(input)
    )

    return new this.nodeClass(content)
  }
}

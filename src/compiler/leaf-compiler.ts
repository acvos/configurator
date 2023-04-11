import { Compiler, Descriptor, Instantiable, Schema } from "../types"

export class LeafCompiler implements Compiler {
  constructor(private nodeClass: Instantiable<Descriptor>) {}

  compile(input: any, schema: Schema) {
    return new this.nodeClass(schema.validate(input))
  }
}

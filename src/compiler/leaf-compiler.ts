import { Compiler, Descriptor, Instantiable } from "../types"

export class LeafCompiler implements Compiler {
  constructor(private nodeClass: Instantiable<Descriptor>) {}

  compile(input: any) {
    return new this.nodeClass(input)
  }
}

import { Compiler, Descriptor, Instantiable } from "../types"
import { map } from "../map"

export class CompositeCompiler implements Compiler {
  constructor(private rootCompiler: Compiler, private nodeClass: Instantiable<Descriptor>) {}

  compile(input: any) {
    const content = map(x => this.rootCompiler.compile(x), input)

    return new this.nodeClass(content)
  }
}

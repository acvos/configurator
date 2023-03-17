import { Compiler } from "../types"
import { ArrayDescriptor } from "./descriptors/array-descriptor"
import { ObjectDescriptor } from "./descriptors/object-descriptor"
import { PrimitiveDescriptor } from "./descriptors/primitive-descriptor"
import { CompositeCompiler } from "./composite-compiler"
import { LeafCompiler } from "./leaf-compiler"
import { TemplateCompiler } from "./template-compiler"

export class ConfigurationCompiler implements Compiler {
  private arrayCompiler: Compiler = new CompositeCompiler(this, ArrayDescriptor)
  private objectCompiler: Compiler = new CompositeCompiler(this, ObjectDescriptor)
  private primitiveCompiler: Compiler = new LeafCompiler(PrimitiveDescriptor)
  private templateCompiler: Compiler = new TemplateCompiler()

  compile(input: any) {
    if (input instanceof Array) {
      return this.arrayCompiler.compile(input)
    }

    if (typeof input === "object" && input !== null) {
      return this.objectCompiler.compile(input)
    }

    if (typeof input === "string" && input.includes("${")) {
      return this.templateCompiler.compile(input)
    }

    return this.primitiveCompiler.compile(input)
  }
}

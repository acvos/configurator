import { Compiler, Schema } from "../types"
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

  compile(input: any, schema: Schema) {
    if (input instanceof Array) {
      return this.arrayCompiler.compile(input, schema)
    }

    if (typeof input === "object" && input !== null) {
      return this.objectCompiler.compile(input, schema)
    }

    if (typeof input === "string" && input.includes("${")) {
      return this.templateCompiler.compile(input, schema)
    }

    return this.primitiveCompiler.compile(input, schema)
  }
}

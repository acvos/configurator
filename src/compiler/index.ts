import { Compiler, Schema } from "../types"
import { map } from "../map"
import { ArrayDescriptor } from "./descriptors/array-descriptor"
import { ObjectDescriptor } from "./descriptors/object-descriptor"
import { LazyDescriptor } from "./descriptors/lazy-descriptor"
import { PrimitiveDescriptor } from "./descriptors/primitive-descriptor"
import { TemplateCompiler } from "./template-compiler"

export class ConfigurationCompiler implements Compiler {
  private templateCompiler = new TemplateCompiler()

  compile(input: any, schema: Schema) {
    // template substitutions go their own way
    if (typeof input === "string" && input.includes("${")) {
      return this.templateCompiler.compile(input)
    }

    const validated = schema.validate(input)

    const content: any = (typeof validated === "object" && validated !== null)
      ? map((x, key) => this.compile(x, schema.getChild(key)), validated)
      : validated

    if (content instanceof Array) {
      return new ArrayDescriptor(content)
    }
    if (typeof content === "function") {
      return new LazyDescriptor(content)
    }
    if (typeof content === "object") {
      return new ObjectDescriptor(content)
    }

    return new PrimitiveDescriptor(content)
  }
}

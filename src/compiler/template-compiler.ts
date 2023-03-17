import { Compiler } from "../types"
import { ReferenceDescriptor } from "./descriptors/reference-descriptor"
import { TemplateDescriptor } from "./descriptors/template-descriptor"

export class TemplateCompiler implements Compiler {
  private templateRegex = /\$\{([a-zA-Z0-9-_\.\(\)]*)\}/g

  compile(input: any) {
    const matches = <Array<string>>input.match(this.templateRegex)
    if (matches[0] === input) {
      return new ReferenceDescriptor(input.slice(2, -1))
    }

    const references = matches.reduce(
      (acc, next) => ({ ...acc, [next]: new ReferenceDescriptor(next.slice(2, -1)) }),
      {}
    )

    return new TemplateDescriptor(input, references)
  }
}

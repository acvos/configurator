import { Compiler } from "../types"
import { FuncDescriptor } from "./descriptors/func-descriptor"
import { ReferenceDescriptor } from "./descriptors/reference-descriptor"
import { TemplateDescriptor } from "./descriptors/template-descriptor"

export class TemplateCompiler implements Compiler {
  private templateRegex = /\$\{([a-zA-Z0-9-_\.\(\)]*)\}/g
  private funcTemplate = /^(.*)\((.*)\)$/

  private createResolver(input: any) {
    const cleanInput = input.slice(2, -1)
    const matches = <Array<string>>cleanInput.match(this.funcTemplate)
    if (!matches) {
      return new ReferenceDescriptor(cleanInput.split("."))
    }

    const [_, func, arg] = matches

    return new FuncDescriptor(func, arg)
  }

  compile(input: any) {
    const matches = <Array<string>>input.match(this.templateRegex)
    if (matches[0] === input) {
      return this.createResolver(input)
    }

    const references = matches.reduce(
      (acc, next) => ({ ...acc, [next]: this.createResolver(next) }),
      {}
    )

    return new TemplateDescriptor(input, references)
  }
}

import { Schema } from "../../types"
import { ArrayType } from "./array-type"
import { ClassType } from "./class-type"
import { FunctionType } from "./function-type"

export class ServiceType implements Schema {
  private args = new ArrayType("args", { required: true })
  private factory = new FunctionType("factory", { required: false })
  private klass = new ClassType("class", { required: false })

  constructor(readonly name: string) {}

  private extractFactory(input: any) {
    if (input.factory) {
      return this.factory.validate(input.factory)
    }

    if (input.class) {
      const Klass = this.klass.validate(input.class)

      return (...args: Array<any>) => new Klass(...args)
    }

    throw new Error(`Validation error: class or factory field is required for service ${this.name}`)
  }

  addArg(schema: Schema) {
    this.args.addItem(schema)
  }

  validate(input: any) {
    if (!input) {
      throw new Error(`Validation error: ${this.name} is a service, it can't be empty`)
    }

    if (typeof input !== "object") {
      throw new Error(`Validation error: ${this.name} configuration must be an object, ${typeof input} provided`)
    }

    const factory = this.extractFactory(input)

    return () => factory(...input.args)
  }

  getChild(key: string): Schema {
    if (key === "class") {
      return this.klass
    }

    if (key === "factory") {
      return this.factory
    }

    if (key === "args") {
      return this.args
    }

    throw new Error(`Validation error: unrecognized key: ${this.name}.${key}. Service definitions require class/factory and args`)
  }
}

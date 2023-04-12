import { SchemaBuilder } from "../types"
import { AnyType } from "./field-types/any-type"
import { NumberType } from "./field-types/number-type"
import { ObjectType } from "./field-types/object-type"
import { ServiceType } from "./field-types/service-type"
import { StringType } from "./field-types/string-type"
import { ParameterBuilder } from "./parameter-builder"

export class ServiceBuilder implements SchemaBuilder {
  private context: ServiceType

  constructor(context: ServiceType, private parent?: SchemaBuilder) {
    this.context = context
  }

  addAnyArgument() {
    this.context.addArg(new AnyType(""))

    return this
  }

  addStringArgument() {
    this.context.addArg(new StringType("", { required: true }))

    return this
  }

  addNumericArgument() {
    this.context.addArg(new NumberType("", { required: true }))

    return this
  }

  addObjectArgument() {
    const field = new ObjectType("", { required: true })
    this.context.addArg(field)

    return new ParameterBuilder(field, this)
  }

  end(): SchemaBuilder {
    return this.parent || this
  }

  product() {
    return this.context
  }
}

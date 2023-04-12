import { SchemaBuilder } from "../types"
import { AnyType } from "./field-types/any-type"
import { ClassType } from "./field-types/class-type"
import { FunctionType } from "./field-types/function-type"
import { NumberType } from "./field-types/number-type"
import { ObjectType } from "./field-types/object-type"
import { ServiceType } from "./field-types/service-type"
import { StringType } from "./field-types/string-type"
import { ServiceBuilder } from "./service-builder"

interface FieldOptions {
  required?: boolean
}

export class ParameterBuilder implements SchemaBuilder {
  private context: ObjectType

  constructor(context?: ObjectType, private parent?: SchemaBuilder) {
    this.context = context || new ObjectType("", { required: true })
  }

  addAny(name: string) {
    this.context.addField(name, new AnyType(`${this.context.name}.${name}`))

    return this
  }

  addString(name: string, { required = false }: FieldOptions = {}) {
    this.context.addField(name, new StringType(`${this.context.name}.${name}`, { required }))

    return this
  }

  addNumber(name: string, { required = false }: FieldOptions = {}) {
    this.context.addField(name, new NumberType(`${this.context.name}.${name}`, { required }))

    return this
  }

  addFunction(name: string, { required = false }: FieldOptions = {}) {
    this.context.addField(name, new FunctionType(`${this.context.name}.${name}`, { required }))

    return this
  }

  addClass(name: string, { required = false }: FieldOptions = {}) {
    this.context.addField(name, new ClassType(`${this.context.name}.${name}`, { required }))

    return this
  }

  addObject(name: string, { required = false }: FieldOptions = {}) {
    const field = new ObjectType(`${this.context.name}.${name}`, { required })
    this.context.addField(name, field)

    return new ParameterBuilder(field, this)
  }

  addService(name: string) {
    const field = new ServiceType(`${this.context.name}.${name}`)
    this.context.addField(name, field)

    return new ServiceBuilder(field, this)
  }

  end(): SchemaBuilder {
    return this.parent || this
  }

  product() {
    return this.context
  }
}

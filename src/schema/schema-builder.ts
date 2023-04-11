import { AnyType } from "./field-types/any-type"
import { ClassType } from "./field-types/class-type"
import { FunctionType } from "./field-types/function-type"
import { NumberType } from "./field-types/number-type"
import { ObjectType } from "./field-types/object-type"
import { StringType } from "./field-types/string-type"

interface FieldOptions {
  required?: boolean
}

export class SchemaBuilder {
  private context: ObjectType

  constructor(context?: ObjectType, private parent?: SchemaBuilder) {
    this.context = context || new ObjectType("", {}, true)
  }

  addAny(name: string): SchemaBuilder {
    this.context.addField(name, new AnyType(`${this.context.name}.${name}`))

    return this
  }

  addString(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new StringType(`${this.context.name}.${name}`, required))

    return this
  }

  addNumber(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new NumberType(`${this.context.name}.${name}`, required))

    return this
  }

  addFunction(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new FunctionType(`${this.context.name}.${name}`, required))

    return this
  }

  addClass(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new ClassType(`${this.context.name}.${name}`, required))

    return this
  }

  addObject(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    const field = new ObjectType(`${this.context.name}.${name}`, {}, required)
    this.context.addField(name, field)

    return new SchemaBuilder(field, this)
  }

  end() {
    return this.parent || this
  }

  product() {
    return this.context
  }
}

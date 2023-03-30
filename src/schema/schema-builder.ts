import { ClassField } from "./field-types/class-field"
import { FunctionField } from "./field-types/function-field"
import { NumberField } from "./field-types/number-field"
import { ObjectField } from "./field-types/object-field"
import { StringField } from "./field-types/string-field"

interface FieldOptions {
  required?: boolean
}

export class SchemaBuilder {
  private context: ObjectField

  constructor(context?: ObjectField, private parent?: SchemaBuilder) {
    this.context = context || new ObjectField("", {}, true)
  }

  addString(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new StringField(`${this.context.name}.${name}`, required))

    return this
  }

  addNumber(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new NumberField(`${this.context.name}.${name}`, required))

    return this
  }

  addFunction(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new FunctionField(`${this.context.name}.${name}`, required))

    return this
  }

  addClass(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    this.context.addField(name, new ClassField(`${this.context.name}.${name}`, required))

    return this
  }

  addObject(name: string, { required = false }: FieldOptions = {}): SchemaBuilder {
    const field = new ObjectField(`${this.context.name}.${name}`, {}, required)
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

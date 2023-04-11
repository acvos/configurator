export type Dictionary<T> = { [key: string]: T }

export interface Instantiable<T> {
  new (...args: Array<any>): T
}

export interface Source {
  type: string
  value: any
}

export interface ConfigurationReader {
  read(source: any): Promise<Array<Dictionary<any>>>
}

export interface FileFormat {
  parse(source: string): Dictionary<any>
}

export type Func = (...args: Array<string>) => any

export interface Context {
  get(path: Array<string>|string): any
  exec(func: string, args: Array<string>): any
}

export interface Descriptor {
  resolve(path: Array<string>, context: Context): any
}

export interface Schema {
  getChild(key: string): Schema
  validate(input: any): any
}

export interface Compiler {
  compile(input: any, schema: Schema): Descriptor
}

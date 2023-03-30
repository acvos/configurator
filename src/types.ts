export type Dictionary<T> = { [key: string]: T }

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

export interface ValidationResponse {
  valid: boolean
  comment: string
}

export interface Schema {
  validate(input: any): ValidationResponse
}

export interface Compiler {
  compile(input: any): Descriptor
}

export interface Instantiable<T> {
  new (...args: Array<any>): T
}

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

export type Func = (x: string) => any

export interface Context {
  get(path: Array<string>): any
  exec(func: string, arg: string): any
}

export interface Descriptor {
  resolve(path: Array<string>, context: Context): any
}

export interface Compiler {
  compile(input: any): Descriptor
}

export interface Instantiable<T> {
  new (...args: Array<any>): T
}

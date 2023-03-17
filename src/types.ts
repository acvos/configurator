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

export interface Descriptor {
  resolve(path: Array<string>, context: Descriptor): any
}

export interface Compiler {
  compile(input: any): Descriptor
}

export interface Instantiable<T> {
  new (...args: Array<any>): T
}

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

import deepmerge from "deepmerge"
import { ConfigurationReader, FileFormat, Dictionary, Source, Func, Schema } from "./types"
import Container from "./container"
import { Reader } from "./reader"
import { ConfigurationCompiler } from "./compiler"
import { importFunc } from "./funcs/import-func"
import { SchemaBuilder } from "./schema/schema-builder"
import { AnyType } from "./schema/field-types/any-type"

interface Config {
  readers?: Dictionary<ConfigurationReader>
  fileFormats?: Dictionary<FileFormat>
  funcs?: Dictionary<Func>
  environment?: Dictionary<any>
}

export class Configurator {
  private reader: Reader
  private compiler: ConfigurationCompiler
  private funcs: Dictionary<(x: string) => any>

  constructor({ readers = {}, fileFormats = {}, funcs = {}, environment }: Config = {}) {
    this.reader = new Reader({
      sourceTypes: readers,
      fileFormats
    })

    const env = environment || process.env
    this.funcs = {
      ...funcs,
      import: importFunc,
      env: (x: string) => env[x]
    }

    this.compiler = new ConfigurationCompiler()
  }

  async loadAll(layers: Array<Source>, schema: Schema = new AnyType("")) {
    const raw = await Promise.all(layers.map(x => this.reader.read(x)))

    const flattened = raw.reduce((acc, next) => acc.concat(next), [])
    const combined = deepmerge.all<Dictionary<any>>(flattened)

    const container = new Container({
      root: this.compiler.compile(combined, schema),
      funcs: this.funcs
    })

    return container
  }

  async load(source: Source, schema: Schema = new AnyType("")) {
    const config = await this.reader.read(source)

    const container = new Container({
      root: this.compiler.compile(config, schema),
      funcs: this.funcs
    })

    return container
  }

  createSchema() {
    return new SchemaBuilder()
  }
}

export default Configurator

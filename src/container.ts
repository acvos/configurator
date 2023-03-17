import { Dictionary, Descriptor, Context, Func } from "./types"

interface Config {
  funcs: Dictionary<Func>
  root: Descriptor
}

export class Container implements Context {
  private funcs: Dictionary<(x: string) => any>
  private root: Descriptor

  constructor({ funcs, root }: Config) {
    this.funcs = funcs
    this.root = root
  }

  get(fields: Array<string>) {
    return this.root.resolve(fields, this)
  }

  exec(funcName: string, arg: string) {
    const func = this.funcs[funcName]
    if (!func) {
      throw new Error(`[Configurator] Unknown template function '${funcName}'`)
    }

    return func(arg)
  }
}

export default Container

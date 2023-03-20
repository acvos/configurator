import { Dictionary, Descriptor, Context, Func } from "./types"

interface Config {
  funcs: Dictionary<Func>
  root: Descriptor
}

export class Container implements Context {
  private funcs: Dictionary<Func>
  private root: Descriptor

  constructor({ funcs, root }: Config) {
    this.funcs = funcs
    this.root = root
  }

  get(path: Array<string>|string) {
    const fields = path instanceof Array ? path : path.split(".")

    return this.root.resolve(fields, this)
  }

  exec(funcName: string, args: Array<string>) {
    const func = this.funcs[funcName]
    if (!func) {
      throw new Error(`[Configurator] Unknown template function '${funcName}'`)
    }

    return func.apply(undefined, args)
  }
}

export default Container

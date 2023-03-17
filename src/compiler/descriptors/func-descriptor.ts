import { Context, Descriptor } from "../../types"

export class FuncDescriptor implements Descriptor {
  constructor(private func: string, private arg: string) {}

  resolve(fields: Array<string>, context: Context) {
    return context.exec(this.func, this.arg)
  }
}

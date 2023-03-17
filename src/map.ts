import { Dictionary } from "./types"

export function map<I, O>(func: (x: I, key: string) => O, xs: Dictionary<I>): Dictionary<O> {
  const res: Dictionary<any> = {}

  for (const key in xs) {
    res[key] = func(xs[key], key)
  }

  return res
}

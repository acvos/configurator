import path from "path"

export const importFunc = (moduleName: string, key: string = "default"): any => {
  // When a node package name is provided
  let pkg
  try {
    pkg = require(moduleName)
  } catch {
    // When a path to a file is provided
    const fullName = path.join(process.cwd(), moduleName)
    try {
      pkg = require(fullName)
    } catch {
      throw new Error(`[Configurator] Module not found: '${moduleName}'`)
    }
  }

  if (!pkg[key]) {
    throw new Error(`[Configurator] Export ${key} not found in module '${moduleName}'`)
  }

  return pkg[key]
}

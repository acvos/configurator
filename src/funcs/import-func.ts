import path from "path"

function loadPackage(name: string) {
  try {
    return require(name)
  } catch {
    // When a path to a file is provided
    return require(path.join(process.cwd(), name))
  }
}

export const importFunc = (moduleName: string, key: string = "default"): any => {
  // When a node package name is provided
  let pkg
  try {
    pkg = loadPackage(moduleName)
  } catch {
    throw new Error(`[Configurator] Module not found: '${moduleName}'`)
  }

  if (!pkg || !pkg[key]) {
    throw new Error(`[Configurator] Export ${key} not found in module '${moduleName}'`)
  }

  return pkg[key]
}

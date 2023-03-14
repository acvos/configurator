import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("File reader", () => {
  it("can read JSON", async () => {
    const config = await configurator.resolve([{ type: "file", value: "test/fixtures/test-config.json" }])
    expect(config).to.be.an("object")
    expect(config).to.haveOwnProperty("test")
    expect(config.test.config.a).to.equal("b")
    expect(config.test.config.c).to.equal(100)
  })

  it("can read YAML", async () => {
    const config = await configurator.resolve([{ type: "file", value: "test/fixtures/test-config.yaml" }])
    expect(config).to.be.an("object")
    expect(config).to.haveOwnProperty("test")
    expect(config.test.config.a).to.equal("b")
    expect(config.test.config.c).to.equal(200)
  })

  it("can read ini-files", async () => {
    const config = await configurator.resolve([{ type: "file", value: "test/fixtures/test-config.ini" }])
    expect(config).to.be.an("object")
    expect(config).to.haveOwnProperty("test")
    expect(config.test.config.a).to.equal("b")
    expect(config.test.config.c).to.equal("300") // No type conversion without schema
  })

  it("can read env-files", async () => {
    const config = await configurator.resolve([{ type: "file", value: "test/fixtures/test-config.env" }])
    expect(config).to.be.an("object")
    expect(config).to.haveOwnProperty("a") // Env files are flat
    expect(config.a).to.equal("b")
    expect(config.c).to.equal("400")
  })

  it("can resolve glob patterns", async () => {
    const config = await configurator.resolve([{ type: "file", value: "**/test-config.{yaml,json,ini}" }])
    expect(config).to.haveOwnProperty("test")
    expect(config.test.config.a).to.equal("b")
  })

  it("sorts files in alphabetical order", async () => {
    const config = await configurator.resolve([{ type: "file", value: "**/test-config.{yaml,json,ini}" }])
    expect(config.test.config.c).to.equal(200)
  })
})
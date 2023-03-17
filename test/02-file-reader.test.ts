import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("File reader", () => {
  it("can read JSON", async () => {
    await configurator.load([{ type: "file", value: "test/fixtures/test-config.json" }])

    expect(configurator.get("test.config.a")).to.equal("b")
    expect(configurator.get("test.config.c")).to.equal(100)
  })

  it("can read YAML", async () => {
    await configurator.load([{ type: "file", value: "test/fixtures/test-config.yaml" }])

    expect(configurator.get("test.config.a")).to.equal("b")
    expect(configurator.get("test.config.c")).to.equal(200)
  })

  it("can resolve glob patterns", async () => {
    await configurator.load([{ type: "file", value: "**/test-config.{yaml,json}" }])

    expect(configurator.get("test.config.a")).to.equal("b")
  })

  it("sorts files in alphabetical order", async () => {
    await configurator.load([{ type: "file", value: "**/test-config.{yaml,json}" }])

    expect(configurator.get("test.config.c")).to.equal(200)
  })
})

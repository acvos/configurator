import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("File reader", () => {
  it("can read JSON", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "test/fixtures/test-config.json" }])

    expect(container.get("test.config.a")).to.equal("b")
    expect(container.get("test.config.c")).to.equal(100)
  })

  it("can read YAML", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "test/fixtures/test-config.yaml" }])

    expect(container.get("test.config.a")).to.equal("b")
    expect(container.get("test.config.c")).to.equal(200)
  })

  it("can resolve glob patterns", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "**/test-config.{yaml,json}" }])

    expect(container.get("test.config.a")).to.equal("b")
  })

  it("sorts files in alphabetical order", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "**/test-config.{yaml,json}" }])

    expect(container.get("test.config.c")).to.equal(200)
  })
})

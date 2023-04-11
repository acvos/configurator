import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("References", () => {
  it("can resolve internal references", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "**/test-config.yaml" }])

    expect(container.get("test.config.ref")).to.equal(container.get("test.config.c"))
  })
})

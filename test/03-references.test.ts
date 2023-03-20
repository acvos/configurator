import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("references", () => {
  it("can resolve internal references", async () => {
    const container = await configurator.load([{ type: "file", value: "**/test-config.yaml" }])

    expect(container.get("test.config.ref")).to.equal(container.get("test.config.c"))
  })
})

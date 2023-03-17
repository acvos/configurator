import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("references", () => {
  it("can resolve internal references", async () => {
    await configurator.load([{ type: "file", value: "**/test-config.yaml" }])

    expect(configurator.get("test.config.ref")).to.equal(configurator.get("test.config.c"))
  })
})

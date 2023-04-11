import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("Templates", () => {
  it("can evaluate reference-based templates", async () => {
    const container = await configurator.loadAll([{ type: "file", value: "**/test-config.yaml" }])

    expect(container.get("test.config.template")).to.equal("AAA-200-b")
  })
})

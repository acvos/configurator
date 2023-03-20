import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

describe("templates", () => {
  it("can evaluate reference-based templates", async () => {
    const container = await configurator.load([{ type: "file", value: "**/test-config.yaml" }])

    expect(container.get("test.config.template")).to.equal("AAA-200-b")
  })
})

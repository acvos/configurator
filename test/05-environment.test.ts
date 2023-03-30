import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator({
  environment: {
    BIRB: "AAAAAAAAAAAAAAAAAAAAAAAAA"
  }
})

describe("Environment", () => {
  it("can read environment variables", async () => {
    const container = await configurator.load([{ type: "file", value: "**/test-config.yaml" }])

    expect(container.get("test.config.env")).to.equal("AAAAAAAAAAAAAAAAAAAAAAAAA")
  })
})

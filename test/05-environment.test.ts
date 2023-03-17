import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator({
  environment: {
    BIRB: "AAAAAAAAAAAAAAAAAAAAAAAAA"
  }
})

describe("environment", () => {
  it("can read environment variables", async () => {
    await configurator.load([{ type: "file", value: "**/test-config.yaml" }])

    expect(configurator.get("test.config.env")).to.equal("AAAAAAAAAAAAAAAAAAAAAAAAA")
  })
})

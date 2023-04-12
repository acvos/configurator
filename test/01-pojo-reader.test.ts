import { expect } from "chai"

import { Configurator } from "../src"

const configurator = new Configurator()

const testConfig = {
  DOGE: "WOW",
  birb: "AAAAAAAAAAAAAAAAAAAAAAAA"
}

describe("Javascript object reader", () => {
  it("can use POJOs as configuration", async () => {
    const container = await configurator.load([{ type: "object", value: testConfig }])

    expect(container.get("DOGE")).to.equal("WOW")
    expect(container.get("birb")).to.equal("AAAAAAAAAAAAAAAAAAAAAAAA")
  })
})

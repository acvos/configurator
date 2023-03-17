import { expect } from "chai"

import { Configurator } from "../src"

const configurator = new Configurator()

const testConfig = {
  DOGE: "WOW",
  birb: "AAAAAAAAAAAAAAAAAAAAAAAA"
}

describe("Javascript object reader", () => {
  it("can use POJOs as configuration", async () => {
    await configurator.load([{ type: "object", value: testConfig }])

    expect(configurator.get("DOGE")).to.equal("WOW")
    expect(configurator.get("birb")).to.equal("AAAAAAAAAAAAAAAAAAAAAAAA")
  })
})

import { expect } from "chai"

import { Configurator } from "../src"

const configurator = new Configurator()

const testConfig = {
  DOGE: "WOW",
  birb: "AAAAAAAAAAAAAAAAAAAAAAAA"
}

describe("Javascript object reader", () => {
  it("can use POJOs as configuration", async () => {
    const config = await configurator.resolve([{ type: "object", value: testConfig }])
    expect(config.DOGE).to.equal("WOW")
    expect(config.birb).to.equal("AAAAAAAAAAAAAAAAAAAAAAAA")
  })
})

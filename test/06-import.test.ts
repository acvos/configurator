import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

const testConfig = {
  test_service: "${import(test/fixtures/echo.js)}",
  doge: "wow"
}

describe("import", () => {
  it("can read environment variables", async () => {
    const container = await configurator.load([{ type: "object", value: testConfig }])

    const service = container.get('test_service')
    expect(service("such much")).to.equal("such much")
  })
})

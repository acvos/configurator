import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()
const schema = configurator
  .createSchema()
    .addNumber("version", { required: true })
    .addObject("memes", { required: true })
      .addString("doge", { required: true })
      .addString("birb")
    .end()
  .product()

// const testConfig = {
//   test_service: "${import(test/fixtures/echo.js)}",
//   doge: "wow"
// }

describe("Schema validators", () => {
  it("can validate data types", async () => {
    const validSchemas = [{
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }, {
      version: "1",
      memes: { doge: 100000000, birb: 100500 } // Anything can be a string
    }, {
      version: 0.5,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }]

    for (const x of validSchemas) {
      const res = schema.validate(x)
      expect(res.valid).to.be.true
    }

    const invalidSchemas = [{
      version: "1.2.3",
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }]

    for (const x of invalidSchemas) {
      const res = schema.validate(x)
      expect(res.valid).to.be.false
    }
  })

  it("respects required fields", async () => {
    const validSchemas = [{
      version: 1,
      memes: { doge: "wow" }
    }]

    for (const x of validSchemas) {
      const res = schema.validate(x)
      expect(res.valid).to.be.true
    }

    const invalidSchemas = [{
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }, {
      version: 1
    }]

    for (const x of invalidSchemas) {
      const res = schema.validate(x)
      expect(res.valid).to.be.false
    }
  })

  it("doesn't allow undescribed fields", async () => {
    const invalidSchemas = [{
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" },
      ohno: "ohno!"
    }, {
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA", ohno: "ohno!" }
    }]

    for (const x of invalidSchemas) {
      const res = schema.validate(x)
      expect(res.valid).to.be.false
    }
  })
})

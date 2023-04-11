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

const expectValid = async (configs: Array<any>) => {
  for (const x of configs) {
    const res = await configurator.loadAll([{ type: "object", value: x }], schema)
    expect(res).to.be.an("object")
  }
}

const expectInvalid = async (configs: Array<any>) => {
  for (const x of configs) {
    try {
      await configurator.loadAll([{ type: "object", value: x }], schema)
      expect(true).to.be.false
    } catch (error: any) {
      expect(error.message).to.match(/validation/i)
    }
  }
}

describe("Schema validation", () => {
  it("can validate data types", async () => {
    await expectValid([{
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }, {
      version: "1",
      memes: { doge: 100000000, birb: 100500 } // Anything can be a string
    }, {
      version: 0.5,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }])

    await expectInvalid([{
      version: "1.2.3",
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }])
  })

  it("respects required fields", async () => {
    await expectValid([{
      version: 1,
      memes: { doge: "wow" }
    }])

    await expectInvalid([{
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" }
    }, {
      version: 1
    }])
  })

  it("doesn't allow undescribed fields", async () => {
    await expectInvalid([{
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA" },
      ohno: "ohno!"
    }, {
      version: 1,
      memes: { doge: "wow", birb: "AAAAAAAAAAAAAAAAAAAA", ohno: "ohno!" }
    }])
  })
})

import { expect } from "chai"
import { Configurator } from "../src"

const configurator = new Configurator()

class Meme {
  constructor(private name: string, private text: string) {}

  explain() {
    return `I am ${this.name}. I ${this.text}!`
  }
}

const schema = configurator
  .createSchema()
    .addInstance("doge")
      .addStringArgument()
      .addStringArgument()
    .end()
  .product()

describe("DI instance management", () => {
  it("can instantiate dependencies", async () => {
    const container = await configurator.load({ type: "object", value: {
      doge: {
        class: Meme,
        args: [
          "DOGE",
          "WOW"
        ]
      }
    }}, schema)

    const text = container.get("doge").explain()

    expect(text).to.equal("I am DOGE. I WOW!")
  })
})

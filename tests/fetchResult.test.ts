import fetch from "node-fetch"
import { fetchResult } from "../src/fetchResult"

jest.mock("node-fetch", () => jest.fn())

describe("fetchResult export test suite", () => {
  it("Should call node-fetch", () => {
    fetchResult("foo")
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

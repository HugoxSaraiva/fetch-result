import { AbortError } from "../src/abortError"

describe("AbortError test suite", () => {
  it("AbortError should be an instance of Error", () => {
    const abortError = new AbortError()
    expect(abortError).toBeInstanceOf(Error)
  })

  it("AbortError should have the name AbortError", () => {
    const abortError = new AbortError()
    expect(abortError.name).toBe("AbortError")
  })

  it("AbortError should have a message property", () => {
    const abortError = new AbortError()
    expect(abortError.message).toBeDefined()
  })
})

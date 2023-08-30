// Result<unknown, HTTPResponseError | JSONResponseParseError | TypeError>

import { Response } from "node-fetch"
import { FetchResponse } from "../src/fetchResponse"
import { HTTPResponseError } from "../src/HTTPResponseError"
import { JSONResponseParseError } from "../src/JSONParseError"

const jsonData = {
  foo: 1,
  bar: {
    baz: "a",
  },
}

const jsonString = JSON.stringify(jsonData)

const nonJsonData = "foo"

const stringData = "foo"

describe("FetchResponse json test suite", () => {
  it("JSON Response should work", async () => {
    const response = new Response(jsonString, { status: 200 })
    const result = await new FetchResponse(response).json()
    expect(result.unwrap()).toStrictEqual(jsonData)
  })

  it("FetchResponse json() should return HTTPResponseError when response is not ok", async () => {
    const response = new Response(jsonString, { status: 400 })
    const result = await new FetchResponse(response).json()
    expect(result.val).toBeInstanceOf(HTTPResponseError)
  })

  it("FetchResponse json() should return JSONResponseParseError when response body is not a json", async () => {
    const response = new Response(nonJsonData, { status: 200 })
    const result = await new FetchResponse(response).json()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(JSONResponseParseError)
  })

  it("Trying to parse JSON twice should fail", async () => {
    const response = new Response(jsonString, { status: 200 })
    const responseResult = new FetchResponse(response)
    await responseResult.json()
    const result = await responseResult.json()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(TypeError)
  })
})

describe("FetchResponse text test suite", () => {
  it("Text Response should work", async () => {
    const response = new Response(stringData, { status: 200 })
    const result = await new FetchResponse(response).text()
    expect(result.unwrap()).toEqual(stringData)
  })

  it("FetchResponse text() should return HTTPResponseError when response is not ok", async () => {
    const response = new Response(stringData, { status: 400 })
    const result = await new FetchResponse(response).text()
    expect(result.val).toBeInstanceOf(HTTPResponseError)
  })

  it("Trying to parse text twice should fail", async () => {
    const response = new Response(stringData, { status: 200 })
    const responseResult = new FetchResponse(response)
    await responseResult.text()
    const result = await responseResult.text()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(TypeError)
  })
})

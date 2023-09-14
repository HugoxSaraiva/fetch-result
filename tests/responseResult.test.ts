import { Response } from "node-fetch"
import { ResponseResult } from "../src/responseResult"
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

describe("ResponseResult json test suite", () => {
  it("JSON Response should work", async () => {
    const response = new Response(jsonString, { status: 200 })
    const result = await new ResponseResult(response).json()
    expect(result.unwrap()).toStrictEqual(jsonData)
  })

  it("ResponseResult json() should return HTTPResponseError when response is not ok", async () => {
    const response = new Response(jsonString, { status: 400 })
    const result = await new ResponseResult(response).json()
    expect(result.val).toBeInstanceOf(HTTPResponseError)
  })

  it("ResponseResult json() should return JSONResponseParseError when response body is not a json", async () => {
    const response = new Response(nonJsonData, { status: 200 })
    const result = await new ResponseResult(response).json()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(JSONResponseParseError)
  })

  it("Trying to parse JSON twice should fail", async () => {
    const response = new Response(jsonString, { status: 200 })
    const responseResult = new ResponseResult(response)
    await responseResult.json()
    const result = await responseResult.json()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(TypeError)
  })
})

describe("ResponseResult text test suite", () => {
  it("Text Response should work", async () => {
    const response = new Response(stringData, { status: 200 })
    const result = await new ResponseResult(response).text()
    expect(result.unwrap()).toEqual(stringData)
  })

  it("ResponseResult text() should return HTTPResponseError when response is not ok", async () => {
    const response = new Response(stringData, { status: 400 })
    const result = await new ResponseResult(response).text()
    expect(result.val).toBeInstanceOf(HTTPResponseError)
  })

  it("Trying to parse text twice should fail", async () => {
    const response = new Response(stringData, { status: 200 })
    const responseResult = new ResponseResult(response)
    await responseResult.text()
    const result = await responseResult.text()
    expect(result.err).toBe(true)
    expect(result.val).toBeInstanceOf(TypeError)
  })
})

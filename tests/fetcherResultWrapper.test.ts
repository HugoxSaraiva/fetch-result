import { Ok } from "ts-results"
import { fetchResultWrapper } from "../src/fetchResultWrapper"
import { ResponseResult } from "../src/responseResult"
import { Fetcher } from "../src/fetcher"
import { FetchError, Response } from "node-fetch"
import { AbortError } from "../src/abortError"

const okResponse = new Response("foo")
const fetchError = new FetchError("foo", "bar")
const abortError = new AbortError()

const okFetcher: Fetcher = async () => okResponse

const errFetcher: Fetcher = async () => {
  throw fetchError
}

const abortFetcher: Fetcher = async () => {
  throw abortError
}

describe("FetcherResultWrapper test suite", () => {
  it("Should return Ok(ResponseResult) when fetcher returns a response", async () => {
    const fetchResult = fetchResultWrapper(okFetcher)
    const result = await fetchResult("")
    expect(result).toBeInstanceOf(Ok)
    expect(result.val).toBeInstanceOf(ResponseResult)
    expect((result.val as ResponseResult).response).toEqual(okResponse)
  })

  it("Should return Err(FetchError) when fetcher throws a FetchError", async () => {
    const fetchResult = fetchResultWrapper(errFetcher)
    const result = await fetchResult("")
    expect(result.err).toBe(true)
    expect(result.val).toEqual(fetchError)
  })

  it("Should return Err(AbortError) when fetcher throws an AbortError", async () => {
    const fetchResult = fetchResultWrapper(abortFetcher)
    const result = await fetchResult("")
    expect(result.err).toBe(true)
    expect(result.val).toEqual(abortError)
  })
})

import { Err, Ok, Result } from "ts-results"
import { FetchError, Fetcher, FetcherInput } from "./fetcher"
import { ResponseResult } from "./responseResult"
import { AbortError } from "./abortError"

export type fetchToResultFn = (
  ...input: FetcherInput
) => Promise<Result<ResponseResult, FetchError | AbortError>>

export const fetchResultWrapper: (fetcher: Fetcher) => fetchToResultFn =
  (fetcher) =>
  async (...input) => {
    try {
      const fetchResponse = await fetcher(...input)
      return Ok(new ResponseResult(fetchResponse))
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return Err(new AbortError())
      }
      return Err(error as FetchError)
    }
  }

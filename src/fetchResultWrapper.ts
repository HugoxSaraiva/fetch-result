import { Err, Ok, Result } from "ts-results"
import { FetchError, Fetcher, FetcherInput } from "./fetcher"
import { FetchResponse } from "./fetchResponse"
import { AbortError } from "./abortError"

export type FetchResultError = FetchError | AbortError
export type FetchResultOutput = Result<FetchResponse, FetchResultError>

export type FetchResultFn = (
  ...input: FetcherInput
) => Promise<FetchResultOutput>

export const fetchResultWrapper: (fetcher: Fetcher) => FetchResultFn =
  (fetcher) =>
  async (...input) => {
    try {
      const fetchResponse = await fetcher(...input)
      return Ok(new FetchResponse(fetchResponse))
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return Err(new AbortError())
      }
      return Err(error as FetchError)
    }
  }

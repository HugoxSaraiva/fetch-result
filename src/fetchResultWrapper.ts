import { Result } from "ts-results"
import { Fetcher } from "./fetcher"
import { ResponseResult } from "./responseResult"
import { AbortError } from "./abortError"
import { FetchError } from "node-fetch"

export function fetchResultWrapper(fetcher: Fetcher) {
  return async (...input: Parameters<Fetcher>) => {
    const fetchResponseResult = await Result.wrapAsync(() =>fetcher(...input))

    return fetchResponseResult
      .map((response) => new ResponseResult(response))
      .mapErr(
        (error) => {
          if (error instanceof Error && error.name === "AbortError") {
            return new AbortError()
          }
          return error as FetchError
        })

  }
}

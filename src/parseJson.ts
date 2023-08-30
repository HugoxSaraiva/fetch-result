import { Result } from "ts-results"
import { FetchResultError, FetchResultOutput } from "./fetchResultWrapper"
import { JsonError } from "./fetchResponse"

type ParseJsonFn = (
  fetchResult: FetchResultOutput
) => Promise<Result<unknown, JsonError | FetchResultError>>

export const parseJson: ParseJsonFn = async (
  fetchResult: FetchResultOutput
) => {
  if (fetchResult.err) {
    return fetchResult
  }
  const responseResult = fetchResult.val
  const parseResult = await responseResult.json()
  if (parseResult.err) {
    return parseResult
  }
  return parseResult
}

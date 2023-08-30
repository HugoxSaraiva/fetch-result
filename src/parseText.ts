import { Result } from "ts-results"
import { FetchResultError, FetchResultOutput } from "./fetchResultWrapper"
import { TextError } from "./fetchResponse"

type ParseTextFn = (
  fetchResult: FetchResultOutput
) => Promise<Result<unknown, TextError | FetchResultError>>

export const parseText: ParseTextFn = async (
  fetchResult: FetchResultOutput
) => {
  if (fetchResult.err) {
    return fetchResult
  }
  const responseResult = fetchResult.val
  const parseResult = await responseResult.text()
  if (parseResult.err) {
    return parseResult
  }
  return parseResult
}

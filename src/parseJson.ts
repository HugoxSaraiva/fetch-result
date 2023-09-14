import { Ok, Result } from "ts-results"
import { ResponseResult } from "./responseResult"

export async function parseJson<T = unknown, E = unknown>(
  fetchResponseResult: Result<ResponseResult, E>
) {
  if (fetchResponseResult.err) {
    return fetchResponseResult
  }
  const responseResult = fetchResponseResult.val
  const parseResult = await responseResult.json()
  return parseResult.map((result)=> result as Ok<T>)
}

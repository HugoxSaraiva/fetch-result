import { Result } from "ts-results"
import { ResponseResult } from "./responseResult"

export async function parseText<E = unknown>(
  fetchResponseResult: Result<ResponseResult, E>
) {
  if (fetchResponseResult.err) {
    return fetchResponseResult
  }
  const responseResult = fetchResponseResult.val
  return await responseResult.text()
}

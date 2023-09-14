import { Response } from "node-fetch"
import { Err, Result } from "ts-results"
import { HTTPResponseError } from "./HTTPResponseError"
import { JSONResponseParseError } from "./JSONParseError"

export class ResponseResult {
  constructor(public readonly response: Response) {}

  json = async (): Promise<Result<unknown, HTTPResponseError | JSONResponseParseError | TypeError>> => {
    if (!this.response.ok) {
      return Err(new HTTPResponseError(this.response))
    }

    const jsonResult = await Result.wrapAsync(async() => this.response.json())
    return jsonResult.mapErr((error) => {
      if (
        error instanceof Error &&
          "type" in error &&
          error.type === "invalid-json"
      ) {
        return new JSONResponseParseError(this.response)
      } else {
        return error as TypeError
      }
    }) 
  }

  text = async (): Promise<Result<string, HTTPResponseError | TypeError >> => {
    if (!this.response.ok) {
      return Err(new HTTPResponseError(this.response))
    }
    const textResult = await Result.wrapAsync(async () => this.response.text())
    return textResult.mapErr((error) => error as TypeError)
  }
}

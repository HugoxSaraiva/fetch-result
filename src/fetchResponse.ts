import { Response } from "node-fetch"
import { Err, Ok, Result } from "ts-results"
import { HTTPResponseError } from "./HTTPResponseError"
import { JSONResponseParseError } from "./JSONParseError"

export type JsonError = HTTPResponseError | JSONResponseParseError | TypeError

export type TextError = HTTPResponseError | TypeError

export class FetchResponse {
  constructor(public readonly response: Response) {}

  json = async (): Promise<Result<unknown, JsonError>> => {
    if (!this.response.ok) {
      return Err(new HTTPResponseError(this.response))
    }
    try {
      const data = await this.response.json()
      return Ok(data)
    } catch (error) {
      if (
        error instanceof Error &&
        "type" in error &&
        error.type === "invalid-json"
      ) {
        return Err(new JSONResponseParseError(this.response))
      } else {
        return Err(error as TypeError)
      }
    }
  }

  text = async (): Promise<Result<string, TextError>> => {
    if (!this.response.ok) {
      return Err(new HTTPResponseError(this.response))
    }
    try {
      const data = await this.response.text()
      return Ok(data)
    } catch (error) {
      return Err(error as TypeError)
    }
  }
}

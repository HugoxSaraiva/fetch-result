import { Response } from "node-fetch"
import { Err, Ok, Result } from "ts-results"

export class HTTPResponseError extends Error {
  constructor(readonly response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

export class JSONResponseParseError extends Error {
  constructor(readonly response: Response) {
    super(`JSON Parse Error: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

export class ResponseResult {
  constructor(public readonly response: Response) {}

  json = async (): Promise<
    Result<unknown, HTTPResponseError | JSONResponseParseError | TypeError>
  > => {
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

  text = async (): Promise<Result<string, HTTPResponseError | TypeError>> => {
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

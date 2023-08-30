import { Response } from "node-fetch"

export class JSONResponseParseError extends Error {
  constructor(readonly response: Response) {
    super(`JSON Parse Error: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

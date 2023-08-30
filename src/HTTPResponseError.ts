import { Response } from "node-fetch"

export class HTTPResponseError extends Error {
  constructor(readonly response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

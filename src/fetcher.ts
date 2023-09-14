/* istanbul ignore file */
import { RequestInfo, Response, RequestInit } from "node-fetch"

export type FetcherInput = [url: URL | RequestInfo, init?: RequestInit]
export type FetcherOutput = Response

export type Fetcher = (...input: FetcherInput) => Promise<FetcherOutput>

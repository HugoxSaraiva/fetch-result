declare module "HTTPResponseError" {
    import { Response } from "node-fetch";
    export class HTTPResponseError extends Error {
        readonly response: Response;
        constructor(response: Response);
    }
}
declare module "JSONParseError" {
    import { Response } from "node-fetch";
    export class JSONResponseParseError extends Error {
        readonly response: Response;
        constructor(response: Response);
    }
}
declare module "abortError" {
    export class AbortError extends Error {
        constructor();
    }
}
declare module "fetchResponse" {
    import { Response } from "node-fetch";
    import { Result } from "ts-results";
    import { HTTPResponseError } from "HTTPResponseError";
    import { JSONResponseParseError } from "JSONParseError";
    export type JsonError = HTTPResponseError | JSONResponseParseError | TypeError;
    export type TextError = HTTPResponseError | TypeError;
    export class FetchResponse {
        readonly response: Response;
        constructor(response: Response);
        json: () => Promise<Result<unknown, JsonError>>;
        text: () => Promise<Result<string, TextError>>;
    }
}
declare module "fetcher" {
    import { FetchError, RequestInfo, Response, RequestInit } from "node-fetch";
    export { FetchError };
    export type FetcherInput = [url: URL | RequestInfo, init?: RequestInit];
    export type FetcherOutput = Response;
    export type Fetcher = (...input: FetcherInput) => Promise<FetcherOutput>;
}
declare module "fetchResultWrapper" {
    import { Result } from "ts-results";
    import { FetchError, Fetcher, FetcherInput } from "fetcher";
    import { FetchResponse } from "fetchResponse";
    import { AbortError } from "abortError";
    export type FetchResultError = FetchError | AbortError;
    export type FetchResultOutput = Result<FetchResponse, FetchResultError>;
    export type FetchResultFn = (...input: FetcherInput) => Promise<FetchResultOutput>;
    export const fetchResultWrapper: (fetcher: Fetcher) => FetchResultFn;
}
declare module "fetchResult" {
    export const fetchResult: import("fetchResultWrapper").FetchResultFn;
}
declare module "parseJson" {
    import { Result } from "ts-results";
    import { FetchResultError, FetchResultOutput } from "fetchResultWrapper";
    import { JsonError } from "fetchResponse";
    type ParseJsonFn = (fetchResult: FetchResultOutput) => Promise<Result<unknown, JsonError | FetchResultError>>;
    export const parseJson: ParseJsonFn;
}
declare module "parseText" {
    import { Result } from "ts-results";
    import { FetchResultError, FetchResultOutput } from "fetchResultWrapper";
    import { TextError } from "fetchResponse";
    type ParseTextFn = (fetchResult: FetchResultOutput) => Promise<Result<unknown, TextError | FetchResultError>>;
    export const parseText: ParseTextFn;
}
declare module "index" {
    export { AbortError } from "abortError";
    export { FetchResponse } from "fetchResponse";
    export { FetchError, type Fetcher } from "fetcher";
    export { type FetchResultOutput } from "fetchResultWrapper";
    export { fetchResult } from "fetchResult";
    export { parseJson } from "parseJson";
    export { parseText } from "parseText";
    export { HTTPResponseError } from "HTTPResponseError";
    export { JSONResponseParseError } from "JSONParseError";
}

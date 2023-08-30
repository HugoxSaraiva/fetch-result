var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("HTTPResponseError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTTPResponseError = void 0;
    class HTTPResponseError extends Error {
        constructor(response) {
            super(`HTTP Error Response: ${response.status} ${response.statusText}`);
            this.response = response;
            this.response = response;
        }
    }
    exports.HTTPResponseError = HTTPResponseError;
});
define("JSONParseError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONResponseParseError = void 0;
    class JSONResponseParseError extends Error {
        constructor(response) {
            super(`JSON Parse Error: ${response.status} ${response.statusText}`);
            this.response = response;
            this.response = response;
        }
    }
    exports.JSONResponseParseError = JSONResponseParseError;
});
define("abortError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbortError = void 0;
    class AbortError extends Error {
        constructor() {
            super("The operation was aborted");
            this.name = "AbortError";
        }
    }
    exports.AbortError = AbortError;
});
define("fetchResponse", ["require", "exports", "ts-results", "HTTPResponseError", "JSONParseError"], function (require, exports, ts_results_1, HTTPResponseError_1, JSONParseError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchResponse = void 0;
    class FetchResponse {
        constructor(response) {
            this.response = response;
            this.json = async () => {
                if (!this.response.ok) {
                    return (0, ts_results_1.Err)(new HTTPResponseError_1.HTTPResponseError(this.response));
                }
                try {
                    const data = await this.response.json();
                    return (0, ts_results_1.Ok)(data);
                }
                catch (error) {
                    if (error instanceof Error &&
                        "type" in error &&
                        error.type === "invalid-json") {
                        return (0, ts_results_1.Err)(new JSONParseError_1.JSONResponseParseError(this.response));
                    }
                    else {
                        return (0, ts_results_1.Err)(error);
                    }
                }
            };
            this.text = async () => {
                if (!this.response.ok) {
                    return (0, ts_results_1.Err)(new HTTPResponseError_1.HTTPResponseError(this.response));
                }
                try {
                    const data = await this.response.text();
                    return (0, ts_results_1.Ok)(data);
                }
                catch (error) {
                    return (0, ts_results_1.Err)(error);
                }
            };
        }
    }
    exports.FetchResponse = FetchResponse;
});
define("fetcher", ["require", "exports", "node-fetch"], function (require, exports, node_fetch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchError = void 0;
    Object.defineProperty(exports, "FetchError", { enumerable: true, get: function () { return node_fetch_1.FetchError; } });
});
define("fetchResultWrapper", ["require", "exports", "ts-results", "fetchResponse", "abortError"], function (require, exports, ts_results_2, fetchResponse_1, abortError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchResultWrapper = void 0;
    const fetchResultWrapper = (fetcher) => async (...input) => {
        try {
            const fetchResponse = await fetcher(...input);
            return (0, ts_results_2.Ok)(new fetchResponse_1.FetchResponse(fetchResponse));
        }
        catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                return (0, ts_results_2.Err)(new abortError_1.AbortError());
            }
            return (0, ts_results_2.Err)(error);
        }
    };
    exports.fetchResultWrapper = fetchResultWrapper;
});
define("fetchResult", ["require", "exports", "fetchResultWrapper", "node-fetch"], function (require, exports, fetchResultWrapper_1, node_fetch_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchResult = void 0;
    node_fetch_2 = __importDefault(node_fetch_2);
    exports.fetchResult = (0, fetchResultWrapper_1.fetchResultWrapper)(node_fetch_2.default);
});
define("parseJson", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseJson = void 0;
    const parseJson = async (fetchResult) => {
        if (fetchResult.err) {
            return fetchResult;
        }
        const responseResult = fetchResult.val;
        const parseResult = await responseResult.json();
        if (parseResult.err) {
            return parseResult;
        }
        return parseResult;
    };
    exports.parseJson = parseJson;
});
define("parseText", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseText = void 0;
    const parseText = async (fetchResult) => {
        if (fetchResult.err) {
            return fetchResult;
        }
        const responseResult = fetchResult.val;
        const parseResult = await responseResult.text();
        if (parseResult.err) {
            return parseResult;
        }
        return parseResult;
    };
    exports.parseText = parseText;
});
define("index", ["require", "exports", "abortError", "fetchResponse", "fetcher", "fetchResult", "parseJson", "parseText", "HTTPResponseError", "JSONParseError"], function (require, exports, abortError_2, fetchResponse_2, fetcher_1, fetchResult_1, parseJson_1, parseText_1, HTTPResponseError_2, JSONParseError_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONResponseParseError = exports.HTTPResponseError = exports.parseText = exports.parseJson = exports.fetchResult = exports.FetchError = exports.FetchResponse = exports.AbortError = void 0;
    Object.defineProperty(exports, "AbortError", { enumerable: true, get: function () { return abortError_2.AbortError; } });
    Object.defineProperty(exports, "FetchResponse", { enumerable: true, get: function () { return fetchResponse_2.FetchResponse; } });
    Object.defineProperty(exports, "FetchError", { enumerable: true, get: function () { return fetcher_1.FetchError; } });
    Object.defineProperty(exports, "fetchResult", { enumerable: true, get: function () { return fetchResult_1.fetchResult; } });
    Object.defineProperty(exports, "parseJson", { enumerable: true, get: function () { return parseJson_1.parseJson; } });
    Object.defineProperty(exports, "parseText", { enumerable: true, get: function () { return parseText_1.parseText; } });
    Object.defineProperty(exports, "HTTPResponseError", { enumerable: true, get: function () { return HTTPResponseError_2.HTTPResponseError; } });
    Object.defineProperty(exports, "JSONResponseParseError", { enumerable: true, get: function () { return JSONParseError_2.JSONResponseParseError; } });
});

import * as algoliasearchProxy from "algoliasearch/index";
import * as encodeProxy from "querystring-es3/encode";
import { VERSION } from "./version";
// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
var algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
var encode = encodeProxy.default || encodeProxy;
export function createSSRAlgoliaClient(_a) {
    var httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    return function (_, appId, apiKey) {
        var client = algoliasearch(appId, apiKey, {});
        client.addAlgoliaAgent("angular-instantsearch " + VERSION);
        client._request = function (rawUrl, opts) {
            var headers = new HttpHeaders();
            headers = headers.set("content-type", opts.method === "POST"
                ? "application/x-www-form-urlencoded"
                : "application/json");
            headers = headers.set("accept", "application/json");
            var url = rawUrl + (rawUrl.includes("?") ? "&" : "?") + encode(opts.headers);
            var transferStateKey = makeStateKey("ngais(" + opts.body + ")");
            if (transferState.hasKey(transferStateKey)) {
                var resp = JSON.parse(transferState.get(transferStateKey, {}));
                return Promise.resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers
                });
            }
            return new Promise(function (resolve, reject) {
                httpClient
                    .request(opts.method, url, {
                    headers: headers,
                    body: opts.body,
                    observe: "response"
                })
                    .subscribe(function (resp) {
                    transferState.set(transferStateKey, JSON.stringify(resp));
                    resolve({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                }, function (resp) {
                    return reject({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                });
            });
        };
        return client;
    };
}
//# sourceMappingURL=create-ssr-algolia-client.js.map
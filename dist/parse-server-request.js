import { AlgoliaSearchHelper } from "algoliasearch-helper";
// Transforms url query to SearchParameters
export function parseServerRequest(req) {
    if (req && req.url && req.url.includes("?")) {
        var query = req.url.split("?")[1];
        return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}
//# sourceMappingURL=parse-server-request.js.map
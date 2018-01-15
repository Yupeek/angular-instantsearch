import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import instantsearch from "instantsearch.js/es";
import { VERSION } from "../version";
var InstantSearchInstance = /** @class */ (function () {
    function InstantSearchInstance() {
    }
    return InstantSearchInstance;
}());
export { InstantSearchInstance };
var NgAisInstance = /** @class */ (function () {
    function NgAisInstance(platformId) {
        this.platformId = platformId;
    }
    NgAisInstance.prototype.init = function (config) {
        // add default searchParameters with highlighting config
        if (!config.searchParameters)
            config.searchParameters = {};
        Object.assign(config.searchParameters, {
            highlightPreTag: "__ais-highlight__",
            highlightPostTag: "__/ais-highlight__"
        });
        // remove URLSync widget if on SSR
        if (!isPlatformBrowser(this.platformId)) {
            config.urlSync = false;
        }
        // custom algolia client agent
        if (!config.createAlgoliaClient) {
            config.createAlgoliaClient = function (algoliasearch, appId, apiKey) {
                var client = algoliasearch(appId, apiKey);
                client.addAlgoliaAgent("angular-instantsearch " + VERSION);
                return client;
            };
        }
        this.instance = instantsearch(config);
    };
    NgAisInstance.prototype.start = function () {
        this.instance.start();
    };
    NgAisInstance.prototype.addWidget = function (widget) {
        this.instance.addWidget(widget);
    };
    NgAisInstance.prototype.addWidgets = function (widgets) {
        this.instance.addWidgets(widgets);
    };
    NgAisInstance.prototype.removeWidget = function (widget) {
        this.instance.removeWidget(widget);
    };
    NgAisInstance.prototype.removeWidgets = function (widgets) {
        this.instance.removeWidgets(widgets);
    };
    NgAisInstance.prototype.on = function (eventName, callback) {
        this.instance.on(eventName, callback);
    };
    NgAisInstance.prototype.off = function (eventName, callback) {
        this.instance.removeListener(eventName, callback);
    };
    NgAisInstance.prototype.getResults = function () {
        return this.instance.helper.lastResults;
    };
    NgAisInstance.prototype.getState = function () {
        return this.instance.helper.state;
    };
    NgAisInstance.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgAisInstance.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    return NgAisInstance;
}());
export { NgAisInstance };
//# sourceMappingURL=instantsearch-instance.js.map
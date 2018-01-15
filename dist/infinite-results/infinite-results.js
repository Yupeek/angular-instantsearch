var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, ContentChild, Input, TemplateRef, Inject, PLATFORM_ID } from "@angular/core";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisInfiniteResults = /** @class */ (function (_super) {
    __extends(NgAisInfiniteResults, _super);
    function NgAisInfiniteResults(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "InfiniteResults") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more results";
        // inner widget state returned from connector
        _this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {}
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: isFunction(_this.transformItems)
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectInfiniteHits, { escapeHits: true });
        return _this;
    }
    NgAisInfiniteResults.prototype.showMore = function (event) {
        event.preventDefault();
        this.state.showMore();
    };
    NgAisInfiniteResults.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-infinite-results",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n        <!-- default rendering if no template specified -->\n        <div *ngIf=\"!template\">\n          <ul [class]=\"cx('list')\">\n            <li\n              [class]=\"cx('item')\"\n              *ngFor=\"let hit of state.hits\"\n            >\n              <ng-ais-highlight attributeName=\"name\" [hit]=\"hit\">\n              </ng-ais-highlight>\n            </li>\n          </ul>\n        </div>\n\n        <button\n          [class]=\"cx('showMore')\"\n          (click)=\"showMore($event)\"\n          [disabled]=\"state.isLastPage\"\n        >\n          {{showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisInfiniteResults.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisInfiniteResults.propDecorators = {
        'template': [{ type: ContentChild, args: [TemplateRef,] },],
        'showMoreLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
    };
    return NgAisInfiniteResults;
}(BaseWidget));
export { NgAisInfiniteResults };
//# sourceMappingURL=infinite-results.js.map
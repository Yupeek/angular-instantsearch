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
import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectPagination } from "instantsearch.js/es/connectors";
import { noop, range } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisPagination = /** @class */ (function (_super) {
    __extends(NgAisPagination, _super);
    function NgAisPagination(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Pagination") || this;
        _this.platformId = platformId;
        // render options
        _this.showFirst = true;
        _this.showLast = false;
        _this.showPrevious = true;
        _this.showNext = true;
        _this.pagesPadding = 3;
        _this.state = {
            createURL: noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisPagination.prototype, "pages", {
        get: function () {
            var _a = this.state, nbPages = _a.nbPages, currentRefinement = _a.currentRefinement;
            var pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
            var pagesPadding = typeof this.pagesPadding === "string"
                ? parseInt(this.pagesPadding, 10)
                : this.pagesPadding;
            if (pagesPadding && pagesPadding > 0) {
                // should not display pages that does not exists
                if (nbPages < pagesPadding * 2 + 1) {
                    return pagesArray;
                }
                var minDelta = currentRefinement - pagesPadding - 1;
                var maxDelta = currentRefinement + pagesPadding + 1;
                if (minDelta < 0) {
                    return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
                }
                if (maxDelta > nbPages) {
                    return range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
                }
                return range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
            }
            return pagesArray;
        },
        enumerable: true,
        configurable: true
    });
    NgAisPagination.prototype.ngOnInit = function () {
        this.createWidget(connectPagination, {
            maxPages: parseNumberInput(this.maxPages)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisPagination.prototype.refine = function (event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page <= this.state.nbPages && page >= 0) {
            this.state.refine(page);
        }
    };
    NgAisPagination.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-pagination",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngIf=\"showFirst\"\n            (click)=\"refine($event, 0)\"\n            [class]=\"\n              cx('item', 'firstPage') +\n              (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(0)\"\n              [class]=\"cx('link')\"\n            >\n              \u00AB\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showPrevious\"\n            (click)=\"refine($event, state.currentRefinement - 1)\"\n            [class]=\"\n              cx('item', 'previousPage') +\n              (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.currentRefinement - 1)\"\n              [class]=\"cx('link')\"\n            >\n              \u2039\n            </a>\n          </li>\n\n          <li\n            [class]=\"\n              cx('item', 'page') +\n              (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n            \"\n            *ngFor=\"let page of pages\"\n            (click)=\"refine($event, page)\"\n          >\n            <a\n              [class]=\"cx('link')\"\n              [href]=\"state.createURL(page)\"\n            >\n              {{page + 1}}\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showNext\"\n            (click)=\"refine($event, state.currentRefinement + 1)\"\n            [class]=\"\n              cx('item', 'nextPage') +\n              (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.currentRefinement + 1)\"\n              [class]=\"cx('link')\"\n            >\n              \u203A\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showLast\"\n            (click)=\"refine($event, state.nbPages)\"\n            [class]=\"\n              cx('item', 'lastPage') +\n              (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.nbPages)\"\n              [class]=\"cx('link')\"\n            >\n              \u00BB\n            </a>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisPagination.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisPagination.propDecorators = {
        'showFirst': [{ type: Input },],
        'showLast': [{ type: Input },],
        'showPrevious': [{ type: Input },],
        'showNext': [{ type: Input },],
        'pagesPadding': [{ type: Input },],
        'maxPages': [{ type: Input },],
    };
    return NgAisPagination;
}(BaseWidget));
export { NgAisPagination };
//# sourceMappingURL=pagination.js.map
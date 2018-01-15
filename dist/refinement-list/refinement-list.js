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
import { connectRefinementList } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisRefinementList = /** @class */ (function (_super) {
    __extends(NgAisRefinementList, _super);
    function NgAisRefinementList(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RefinementList") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.searchPlaceholder = "Search here...";
        _this.operator = "or";
        _this.limitMin = 10;
        // inner state
        _this.searchQuery = "";
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false
        };
        return _this;
    }
    Object.defineProperty(NgAisRefinementList.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisRefinementList.prototype.ngOnInit = function () {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limitMin),
            showMoreLimit: parseNumberInput(this.limitMax),
            attributeName: this.attributeName,
            sortBy: this.sortBy,
            escapeFacetValues: true
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRefinementList.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    NgAisRefinementList.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.searchForItems(this.searchQuery);
    };
    NgAisRefinementList.prototype.handleChange = function (value) {
        this.searchQuery = value;
        this.state.searchForItems(value);
    };
    NgAisRefinementList.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-refinement-list",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <form\n          [class]=\"cx('form')\"\n          *ngIf=\"withSearchBox\"\n          (submit)=\"handleSubmit($event)\"\n          novalidate\n        >\n          <input\n            [class]=\"cx('input')\"\n            autocapitalize=\"off\"\n            autocorrect=\"off\"\n            placeholder=\"{{searchPlaceholder}}\"\n            role=\"textbox\"\n            spellcheck=\"false\"\n            type=\"text\"\n            [value]=\"searchQuery\"\n            (input)=\"handleChange($event.target.value)\"\n          />\n        </form>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? cx('item', 'selected') : '')\"\n            *ngFor=\"let item of items\"\n            (click)=\"refine($event, item)\"\n          >\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('checkbox')\"\n                type=\"checkbox\"\n                value=\"{{item.value}}\"\n                [checked]=\"item.isRefined\"\n              />\n              <ng-ais-highlight\n                attributeName=\"highlighted\"\n                [hit]=\"item\"\n              >\n              </ng-ais-highlight>\n              <span [class]=\"cx('count')\">\n                {{item.count}}\n              </span>\n            </label>\n          </li>\n        </ul>\n\n        <button\n          *ngIf=\"state.canToggleShowMore\"\n          (click)=\"state.toggleShowMore()\"\n        >\n          {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementList.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRefinementList.propDecorators = {
        'showMoreLabel': [{ type: Input },],
        'showLessLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'withSearchBox': [{ type: Input },],
        'searchPlaceholder': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'operator': [{ type: Input },],
        'limitMin': [{ type: Input },],
        'limitMax': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisRefinementList;
}(BaseWidget));
export { NgAisRefinementList };
//# sourceMappingURL=refinement-list.js.map
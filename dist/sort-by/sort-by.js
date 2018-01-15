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
import { connectSortBySelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisSortBy = /** @class */ (function (_super) {
    __extends(NgAisSortBy, _super);
    function NgAisSortBy(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "SortBy") || this;
        _this.platformId = platformId;
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop
        };
        return _this;
    }
    NgAisSortBy.prototype.ngOnInit = function () {
        this.createWidget(connectSortBySelector, { indices: this.indices });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisSortBy.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-sort-by",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.options\"\n            [value]=\"item.value\"\n            [selected]=\"item.value === state.currentRefinement\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisSortBy.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisSortBy.propDecorators = {
        'indices': [{ type: Input },],
    };
    return NgAisSortBy;
}(BaseWidget));
export { NgAisSortBy };
//# sourceMappingURL=sort-by.js.map
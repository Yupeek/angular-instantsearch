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
import { connectHitsPerPage } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisResultsPerPage = /** @class */ (function (_super) {
    __extends(NgAisResultsPerPage, _super);
    function NgAisResultsPerPage(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "ResultsPerPage") || this;
        _this.platformId = platformId;
        _this.state = {
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisResultsPerPage.prototype.ngOnInit = function () {
        this.createWidget(connectHitsPerPage, { items: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisResultsPerPage.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-results-per-page",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.items\"\n            [value]=\"item.value\"\n            [selected]=\"item.isRefined\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisResultsPerPage.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisResultsPerPage.propDecorators = {
        'items': [{ type: Input },],
    };
    return NgAisResultsPerPage;
}(BaseWidget));
export { NgAisResultsPerPage };
//# sourceMappingURL=results-per-page.js.map
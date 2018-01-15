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
import { connectClearAll } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisClearRefinements = /** @class */ (function (_super) {
    __extends(NgAisClearRefinements, _super);
    function NgAisClearRefinements(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "ClearRefinements") || this;
        _this.platformId = platformId;
        _this.buttonLabel = "Clear refinements";
        _this.clearsQuery = false;
        _this.excludeAttributes = [];
        _this.state = { hasRefinements: false, refine: noop };
        return _this;
    }
    NgAisClearRefinements.prototype.ngOnInit = function () {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisClearRefinements.prototype.handleClick = function (event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    };
    NgAisClearRefinements.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-clear-refinements",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <button\n          [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n          (click)=\"handleClick($event)\"\n          [disabled]=\"!state.hasRefinements\"\n        >\n          {{buttonLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisClearRefinements.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisClearRefinements.propDecorators = {
        'buttonLabel': [{ type: Input },],
        'clearsQuery': [{ type: Input },],
        'excludeAttributes': [{ type: Input },],
    };
    return NgAisClearRefinements;
}(BaseWidget));
export { NgAisClearRefinements };
//# sourceMappingURL=clear-refinements.js.map
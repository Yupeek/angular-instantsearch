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
import { connectNumericSelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisNumericSelector = /** @class */ (function (_super) {
    __extends(NgAisNumericSelector, _super);
    function NgAisNumericSelector(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "NumericSelector") || this;
        _this.platformId = platformId;
        _this.operator = "=";
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop
        };
        return _this;
    }
    NgAisNumericSelector.prototype.ngOnInit = function () {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attributeName,
            operator: this.operator,
            options: this.options
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericSelector.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-selector",
                    template: "\n    <div [class]=\"cx('')\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.options\"\n            [value]=\"item.value\"\n            [selected]=\"item.value === state.currentRefinement\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericSelector.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisNumericSelector.propDecorators = {
        'attributeName': [{ type: Input },],
        'operator': [{ type: Input },],
        'options': [{ type: Input },],
    };
    return NgAisNumericSelector;
}(BaseWidget));
export { NgAisNumericSelector };
//# sourceMappingURL=numeric-selector.js.map
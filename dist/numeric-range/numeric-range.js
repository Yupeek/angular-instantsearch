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
import { Component, Input } from "@angular/core";
import { connectRange } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisNumericRange = /** @class */ (function (_super) {
    __extends(NgAisNumericRange, _super);
    function NgAisNumericRange(searchInstance) {
        var _this = _super.call(this, searchInstance, "RangeSlider") || this;
        // render options
        _this.currency = "$";
        _this.separator = "to";
        _this.submitLabel = "Go";
        _this.precision = 2;
        // inner state
        _this.minInputValue = "";
        _this.maxInputValue = "";
        _this.state = {
            range: { min: undefined, max: undefined },
            refine: noop,
            start: [0, 0]
        };
        return _this;
    }
    Object.defineProperty(NgAisNumericRange.prototype, "step", {
        get: function () {
            return 1 / Math.pow(10, parseNumberInput(this.precision));
        },
        enumerable: true,
        configurable: true
    });
    NgAisNumericRange.prototype.ngOnInit = function () {
        this.createWidget(connectRange, {
            attributeName: this.attributeName,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericRange.prototype.handleChange = function (event, type) {
        var value = parseNumberInput(event.target.value);
        if (type === "min") {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    };
    NgAisNumericRange.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    };
    NgAisNumericRange.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-range",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <form\n          [class]=\"cx('form')\"\n          (submit)=\"handleSubmit($event)\"\n          novalidate\n        >\n          <label [class]=\"cx('label')\">\n            <span [class]=\"cx('currency')\">{{currency}} </span>\n            <input\n              [class]=\"cx('input')\"\n              type=\"number\"\n              [min]=\"state.range.min\"\n              [max]=\"state.range.max\"\n              [placeholder]=\"state.range.min\"\n              [value]=\"minInputValue\"\n              [step]=\"step\"\n              (change)=\"handleChange($event, 'min')\"\n            />\n          </label>\n\n          <span [class]=\"cx('separator')\"> {{separator}} </span>\n\n          <label [class]=\"cx('label')\">\n            <span [class]=\"cx('currency')\">{{currency}} </span>\n            <input\n              [class]=\"cx('input')\"\n              type=\"number\"\n              [min]=\"state.range.min\"\n              [max]=\"state.range.max\"\n              [placeholder]=\"state.range.max\"\n              [value]=\"maxInputValue\"\n              [step]=\"step\"\n              (change)=\"handleChange($event, 'max')\"\n            />\n          </label>\n\n          <button\n            [class]=\"cx('submit')\"\n            (click)=\"handleSubmit($event)\"\n          >\n            {{submitLabel}}\n          </button>\n        </form>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericRange.ctorParameters = function () { return [
        { type: NgAisInstance, },
    ]; };
    NgAisNumericRange.propDecorators = {
        'currency': [{ type: Input },],
        'separator': [{ type: Input },],
        'submitLabel': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'precision': [{ type: Input },],
    };
    return NgAisNumericRange;
}(BaseWidget));
export { NgAisNumericRange };
//# sourceMappingURL=numeric-range.js.map
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
import { Component, Input, ViewChild, Inject, PLATFORM_ID } from "@angular/core";
import { connectRange } from "instantsearch.js/es/connectors";
import { isPlainObject, noop } from "lodash-es";
import * as noUiSlider from "nouislider";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisRangeSlider = /** @class */ (function (_super) {
    __extends(NgAisRangeSlider, _super);
    function NgAisRangeSlider(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RangeSlider") || this;
        _this.platformId = platformId;
        // render options
        _this.pips = true;
        _this.tooltips = true;
        _this.precision = 2;
        _this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1]
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                // create slider
                var config = {
                    animate: false,
                    behaviour: "snap",
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: _this.step,
                    tooltips: _this.tooltips && [
                        { to: _this.formatTooltip },
                        { to: _this.formatTooltip }
                    ]
                };
                if (_this.pips === true || typeof _this.pips === "undefined") {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: "positions",
                            stepped: true,
                            values: [0, 50, 100]
                        }
                    });
                }
                else if (isPlainObject(_this.pips)) {
                    Object.assign(config, { pips: _this.pips });
                }
                _this.slider = noUiSlider.create(_this.sliderContainer.nativeElement, config);
                // register listen events
                _this.sliderContainer.nativeElement.noUiSlider.on("change", _this.handleChange);
            }
            // update component inner state
            _this.state = state;
            // update the slider state
            var _a = state.range, min = _a.min, max = _a.max, start = state.start;
            var disabled = min === max;
            var range = disabled ? { min: min, max: max + 0.0001 } : { min: min, max: max };
            _this.slider.updateOptions({ disabled: disabled, range: range, start: start });
        };
        _this.handleChange = function (values) {
            _this.state.refine(values);
        };
        _this.formatTooltip = function (value) {
            return value.toFixed(parseNumberInput(_this.precision));
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeSlider.prototype, "step", {
        get: function () {
            // compute step from the precision value
            return 1 / Math.pow(10, parseNumberInput(this.precision));
        },
        enumerable: true,
        configurable: true
    });
    NgAisRangeSlider.prototype.ngOnInit = function () {
        this.createWidget(connectRange, {
            attributeName: this.attributeName,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRangeSlider.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-range-slider",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRangeSlider.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRangeSlider.propDecorators = {
        'sliderContainer': [{ type: ViewChild, args: ["sliderContainer",] },],
        'pips': [{ type: Input },],
        'tooltips': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'precision': [{ type: Input },],
    };
    return NgAisRangeSlider;
}(BaseWidget));
export { NgAisRangeSlider };
//# sourceMappingURL=range-slider.js.map
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
import { connectToggle } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisToggle = /** @class */ (function (_super) {
    __extends(NgAisToggle, _super);
    function NgAisToggle(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Toggle") || this;
        _this.platformId = platformId;
        _this.values = { on: true, off: undefined };
        _this.state = {
            createURL: noop,
            refine: noop,
            value: {}
        };
        return _this;
    }
    NgAisToggle.prototype.ngOnInit = function () {
        this.createWidget(connectToggle, {
            attributeName: this.attributeName,
            label: this.label,
            values: this.values
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisToggle.prototype.handleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    };
    NgAisToggle.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-toggle",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            (click)=\"handleClick($event)\">\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('checkbox')\"\n                type=\"checkbox\"\n                value=\"{{state.value.name}}\"\n                [checked]=\"state.value.isRefined\"\n              />\n              {{label || state.value.name}}\n              <span [class]=\"cx('count')\">\n                {{state.value.count}}\n              </span>\n            </label>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisToggle.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisToggle.propDecorators = {
        'attributeName': [{ type: Input },],
        'label': [{ type: Input },],
        'values': [{ type: Input },],
    };
    return NgAisToggle;
}(BaseWidget));
export { NgAisToggle };
//# sourceMappingURL=toggle.js.map
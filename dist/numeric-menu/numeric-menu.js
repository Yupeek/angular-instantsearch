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
import { connectNumericRefinementList } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisNumericMenu = /** @class */ (function (_super) {
    __extends(NgAisNumericMenu, _super);
    function NgAisNumericMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "NumericMenu") || this;
        _this.platformId = platformId;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisNumericMenu.prototype.ngOnInit = function () {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attributeName,
            options: this.options
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericMenu.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    };
    NgAisNumericMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n            *ngFor=\"let item of state.items\"\n            (click)=\"refine($event, item)\"\n          >\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('radio')\"\n                type=\"radio\"\n                name=\"NumericRefinementList\"\n                [checked]=\"item.isRefined\"\n              />\n              {{item.label}}\n            </label>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisNumericMenu.propDecorators = {
        'attributeName': [{ type: Input },],
        'options': [{ type: Input },],
    };
    return NgAisNumericMenu;
}(BaseWidget));
export { NgAisNumericMenu };
//# sourceMappingURL=numeric-menu.js.map
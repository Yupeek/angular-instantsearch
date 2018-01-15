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
import { connectMenu } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisMenu = /** @class */ (function (_super) {
    __extends(NgAisMenu, _super);
    function NgAisMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Menu") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.limitMin = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisMenu.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisMenu.prototype.ngOnInit = function () {
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limitMin),
            showMoreLimit: parseNumberInput(this.limitMax),
            attributeName: this.attributeName,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisMenu.prototype.handleClick = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n            *ngFor=\"let item of items\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <a\n              href=\"{{state.createURL(item.value)}}\"\n              (click)=\"handleClick($event, item.value)\"\n            >\n              {{item.label}}\n              <span [class]=\"cx('count')\">{{item.count}}</span>\n            </a>\n          </li>\n        </ul>\n\n        <button\n          *ngIf=\"state.canToggleShowMore\"\n          (click)=\"state.toggleShowMore()\"\n          [class]=\"cx('showMore') + (!state.canToggleShowMore ? (' ' + cx('showMore', 'disabled')) : '')\"\n        >\n          {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisMenu.propDecorators = {
        'showMoreLabel': [{ type: Input },],
        'showLessLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'limitMin': [{ type: Input },],
        'limitMax': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisMenu;
}(BaseWidget));
export { NgAisMenu };
//# sourceMappingURL=menu.js.map
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
import { connectStarRating } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisRatingMenu = /** @class */ (function (_super) {
    __extends(NgAisRatingMenu, _super);
    function NgAisRatingMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RatingMenu") || this;
        _this.platformId = platformId;
        // render options
        _this.andUpLabel = "& Up";
        _this.max = 5;
        _this.state = {
            createURL: noop,
            hasNoResults: false,
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisRatingMenu.prototype.ngOnInit = function () {
        this.createWidget(connectStarRating, {
            attributeName: this.attributeName,
            max: this.max
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRatingMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-rating-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <svg style=\"display:none;\">\n          <symbol\n            id=\"ais-StarRating-starSymbol\"\n            viewBox=\"0 0 24 24\"\n            width=\"24\"\n            height=\"24\"\n          >\n            <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n          </symbol>\n          <symbol\n            id=\"ais-StarRating-starEmptySymbol\"\n            viewBox=\"0 0 24 24\"\n            width=\"24\"\n            height=\"24\"\n          >\n            <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n          </symbol>\n        </svg>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngFor=\"let item of state.items\"\n            [class]=\"cx('item') + (item.isRefined ? cx('item', 'selected') : '')\"\n          >\n            <button\n              [class]=\"cx('button')\"\n              [attr.aria-label]=\"item.name + ' stars & up'\"\n            >\n              <svg\n                *ngFor=\"let star of item.stars\"\n                [ngClass]=\"cx('starIcon')\"\n                aria-hidden=\"true\"\n              >\n                <use\n                  *ngIf=\"star\"\n                  xlink:href=\"#ais-StarRating-starSymbol\"\n                >\n                </use>\n\n                <use\n                  *ngIf=\"!star\"\n                  xlink:href=\"#ais-StarRating-starEmptySymbol\"\n                >\n                </use>\n              </svg>\n\n              <span [class]=\"cx('label')\" aria-hidden=\"true\">\n                {{andUpLabel}}\n              </span>\n\n              <span [class]=\"cx('count')\">\n                {{item.count}}\n              </span>\n            </button>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRatingMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRatingMenu.propDecorators = {
        'andUpLabel': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'max': [{ type: Input },],
    };
    return NgAisRatingMenu;
}(BaseWidget));
export { NgAisRatingMenu };
//# sourceMappingURL=rating-menu.js.map
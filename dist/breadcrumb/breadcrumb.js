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
import { connectBreadcrumb } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisBreadcrumb = /** @class */ (function (_super) {
    __extends(NgAisBreadcrumb, _super);
    function NgAisBreadcrumb(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Breadcrumb") || this;
        _this.platformId = platformId;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisBreadcrumb.prototype, "itemsWithSeparator", {
        get: function () {
            var _this = this;
            return this.state.items.reduce(function (result, curr, idx) {
                return idx === _this.state.items.length - 1
                    ? result.concat([curr]) : result.concat([curr, { separator: true }]);
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    NgAisBreadcrumb.prototype.ngOnInit = function () {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisBreadcrumb.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    };
    NgAisBreadcrumb.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-breadcrumb",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngFor=\"let item of itemsWithSeparator\"\n            [class]=\"cx('item')\"\n            [attr.aria-hidden]=\"item.separator\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.separator ? '>' : ''}}\n            <a\n              [class]=\"cx('link')\"\n              href=\"{{state.createURL(item.value)}}\"\n              *ngIf=\"!item.separator\"\n              (click)=\"handleClick($event, item)\"\n            >\n              {{item.name}}\n            </a>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisBreadcrumb.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisBreadcrumb.propDecorators = {
        'attributes': [{ type: Input },],
        'rootPath': [{ type: Input },],
    };
    return NgAisBreadcrumb;
}(BaseWidget));
export { NgAisBreadcrumb };
//# sourceMappingURL=breadcrumb.js.map
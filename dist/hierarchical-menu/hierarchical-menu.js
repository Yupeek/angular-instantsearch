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
import { connectHierarchicalMenu } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";
var NgAisHierarchicalMenu = /** @class */ (function (_super) {
    __extends(NgAisHierarchicalMenu, _super);
    function NgAisHierarchicalMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "HierarchicalMenu") || this;
        _this.platformId = platformId;
        _this.separator = " > ";
        _this.limit = 10;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHierarchicalMenu.prototype.ngOnInit = function () {
        this.createWidget(connectHierarchicalMenu, {
            limit: parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisHierarchicalMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-hierarchical-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list') + ' ' + cx('list', 'lvl0')\">\n          <ng-ais-hierarchical-menu-item\n            *ngFor=\"let item of items\"\n            [item]=\"item\"\n            [createURL]=\"state.createURL\"\n            [refine]=\"state.refine\"\n          >\n          </ng-ais-hierarchical-menu-item>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisHierarchicalMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisHierarchicalMenu.propDecorators = {
        'transformItems': [{ type: Input },],
        'attributes': [{ type: Input },],
        'separator': [{ type: Input },],
        'rootPath': [{ type: Input },],
        'showParentLevel': [{ type: Input },],
        'limit': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisHierarchicalMenu;
}(BaseWidget));
export { NgAisHierarchicalMenu };
//# sourceMappingURL=hierarchical-menu.js.map
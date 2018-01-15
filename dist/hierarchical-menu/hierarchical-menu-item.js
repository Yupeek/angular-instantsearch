import { Component, Input } from "@angular/core";
import { bem } from "../utils";
var NgAisHierarchicalMenuItem = /** @class */ (function () {
    function NgAisHierarchicalMenuItem() {
        this.lvl = 1;
        this.cx = bem("HierarchicalMenu");
    }
    NgAisHierarchicalMenuItem.prototype.isArray = function (potentialArray) {
        return Array.isArray(potentialArray);
    };
    NgAisHierarchicalMenuItem.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.refine(item.value);
    };
    NgAisHierarchicalMenuItem.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-hierarchical-menu-item",
                    template: "\n    <li\n      [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n      (click)=\"handleClick($event, item)\"\n    >\n      <a\n        [class]=\"cx('link')\"\n        href=\"{{createURL(item.value)}}\"\n        (click)=\"handleClick($event, item)\"\n      >\n        {{item.label}}\n        <span [class]=\"cx('count')\">\n          {{item.count}}\n        </span>\n      </a>\n\n      <ul\n        [class]=\"cx('list') + ' ' + cx('list', 'lvl' + lvl)\"\n        *ngIf=\"item.isRefined && isArray(item.data) && item.data.length > 0\"\n      >\n        <ng-ais-hierarchical-menu-item\n          *ngFor=\"let child of item.data\"\n          [item]=\"child\"\n          [createURL]=\"createURL\"\n          [refine]=\"refine\"\n          [lvl]=\"lvl + 1\"\n        >\n        </ng-ais-hierarchical-menu-item>\n      </ul>\n    </li>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisHierarchicalMenuItem.ctorParameters = function () { return []; };
    NgAisHierarchicalMenuItem.propDecorators = {
        'lvl': [{ type: Input },],
        'refine': [{ type: Input },],
        'createURL': [{ type: Input },],
        'item': [{ type: Input },],
    };
    return NgAisHierarchicalMenuItem;
}());
export { NgAisHierarchicalMenuItem };
//# sourceMappingURL=hierarchical-menu-item.js.map
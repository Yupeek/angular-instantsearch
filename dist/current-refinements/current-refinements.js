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
import { connectCurrentRefinedValues } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisCurrentRefinements = /** @class */ (function (_super) {
    __extends(NgAisCurrentRefinements, _super);
    function NgAisCurrentRefinements(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "CurrentRefinements") || this;
        _this.platformId = platformId;
        // render options
        _this.clearRefinements = "before";
        _this.clearRefinementsLabel = "Clear refinements";
        // connector options
        _this.onlyListedAttributes = false;
        _this.clearsQuery = false;
        _this.attributes = [];
        _this.state = {
            attributes: {},
            clearAllClick: noop,
            clearAllURL: noop,
            createURL: noop,
            refine: noop,
            refinements: []
        };
        return _this;
    }
    Object.defineProperty(NgAisCurrentRefinements.prototype, "refinements", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.refinements)
                : this.state.refinements;
        },
        enumerable: true,
        configurable: true
    });
    NgAisCurrentRefinements.prototype.ngOnInit = function () {
        this.createWidget(connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisCurrentRefinements.prototype.handleClick = function (event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    };
    NgAisCurrentRefinements.prototype.handleClearAllClick = function (event) {
        event.preventDefault();
        this.state.clearAllClick();
    };
    NgAisCurrentRefinements.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-current-refinements",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <button\n          [class]=\"cx('reset')\"\n          (click)=\"handleClearAllClick($event)\"\n          *ngIf=\"clearRefinements === 'before' || clearRefinements === true\">\n          {{clearRefinementsLabel}}\n        </button>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let refinement of refinements\"\n            (click)=\"handleClick($event, refinement)\"\n          >\n            <button [class]=\"cx('button')\">\n              {{refinement.computedLabel}}\n              <span [class]=\"cx('count')\">{{refinement.count}}</span>\n            </button>\n          </li>\n        </ul>\n\n        <button\n          [class]=\"cx('reset')\"\n          (click)=\"handleClearAllClick($event)\"\n          *ngIf=\"clearRefinements === 'after'\">\n          {{clearRefinementsLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisCurrentRefinements.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisCurrentRefinements.propDecorators = {
        'clearRefinements': [{ type: Input },],
        'clearRefinementsLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'onlyListedAttributes': [{ type: Input },],
        'clearsQuery': [{ type: Input },],
        'attributes': [{ type: Input },],
    };
    return NgAisCurrentRefinements;
}(BaseWidget));
export { NgAisCurrentRefinements };
//# sourceMappingURL=current-refinements.js.map
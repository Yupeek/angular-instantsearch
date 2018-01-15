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
import { Component, ContentChild, TemplateRef, Inject, PLATFORM_ID } from "@angular/core";
import { connectStats } from "instantsearch.js/es/connectors";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisStats = /** @class */ (function (_super) {
    __extends(NgAisStats, _super);
    function NgAisStats(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Stats") || this;
        _this.platformId = platformId;
        _this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: ""
        };
        _this.createWidget(connectStats);
        return _this;
    }
    Object.defineProperty(NgAisStats.prototype, "templateContext", {
        get: function () {
            return { state: this.state };
        },
        enumerable: true,
        configurable: true
    });
    NgAisStats.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-stats",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <ng-container\n        [ngClass]=\"cx('body')\"\n        *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <div\n        [class]=\"cx('body')\"\n        *ngIf=\"!template\"\n      >\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisStats.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisStats.propDecorators = {
        'template': [{ type: ContentChild, args: [TemplateRef,] },],
    };
    return NgAisStats;
}(BaseWidget));
export { NgAisStats };
//# sourceMappingURL=stats.js.map
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisInfiniteResults } from "./infinite-results";
var NgAisInfiniteResultsModule = /** @class */ (function () {
    function NgAisInfiniteResultsModule() {
    }
    NgAisInfiniteResultsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisInfiniteResults],
                    entryComponents: [NgAisInfiniteResults],
                    exports: [NgAisInfiniteResults],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisInfiniteResultsModule.ctorParameters = function () { return []; };
    return NgAisInfiniteResultsModule;
}());
export { NgAisInfiniteResultsModule };
//# sourceMappingURL=infinite-results.module.js.map
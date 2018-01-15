import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisResults } from "./results";
var NgAisResultsModule = /** @class */ (function () {
    function NgAisResultsModule() {
    }
    NgAisResultsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisResults],
                    entryComponents: [NgAisResults],
                    exports: [NgAisResults],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisResultsModule.ctorParameters = function () { return []; };
    return NgAisResultsModule;
}());
export { NgAisResultsModule };
//# sourceMappingURL=results.module.js.map
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisRefinementSelect } from "./refinement-select";
var NgAisRefinementSelectModule = /** @class */ (function () {
    function NgAisRefinementSelectModule() {
    }
    NgAisRefinementSelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRefinementSelect],
                    entryComponents: [NgAisRefinementSelect],
                    exports: [NgAisRefinementSelect],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementSelectModule.ctorParameters = function () { return []; };
    return NgAisRefinementSelectModule;
}());
export { NgAisRefinementSelectModule };
//# sourceMappingURL=refinement-select.module.js.map
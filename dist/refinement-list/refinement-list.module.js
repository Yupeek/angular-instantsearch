import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisRefinementList } from "./refinement-list";
var NgAisRefinementListModule = /** @class */ (function () {
    function NgAisRefinementListModule() {
    }
    NgAisRefinementListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRefinementList],
                    entryComponents: [NgAisRefinementList],
                    exports: [NgAisRefinementList],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementListModule.ctorParameters = function () { return []; };
    return NgAisRefinementListModule;
}());
export { NgAisRefinementListModule };
//# sourceMappingURL=refinement-list.module.js.map
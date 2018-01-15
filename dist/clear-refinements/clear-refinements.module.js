import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisClearRefinements } from "./clear-refinements";
var NgAisClearRefinementsModule = /** @class */ (function () {
    function NgAisClearRefinementsModule() {
    }
    NgAisClearRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisClearRefinements],
                    entryComponents: [NgAisClearRefinements],
                    exports: [NgAisClearRefinements],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisClearRefinementsModule.ctorParameters = function () { return []; };
    return NgAisClearRefinementsModule;
}());
export { NgAisClearRefinementsModule };
//# sourceMappingURL=clear-refinements.module.js.map
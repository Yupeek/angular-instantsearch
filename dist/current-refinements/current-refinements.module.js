import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisCurrentRefinements } from "./current-refinements";
var NgAisCurrentRefinementsModule = /** @class */ (function () {
    function NgAisCurrentRefinementsModule() {
    }
    NgAisCurrentRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisCurrentRefinements],
                    entryComponents: [NgAisCurrentRefinements],
                    exports: [NgAisCurrentRefinements],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisCurrentRefinementsModule.ctorParameters = function () { return []; };
    return NgAisCurrentRefinementsModule;
}());
export { NgAisCurrentRefinementsModule };
//# sourceMappingURL=current-refinements.module.js.map
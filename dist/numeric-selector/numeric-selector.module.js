import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericSelector } from "./numeric-selector";
var NgAisNumericSelectorModule = /** @class */ (function () {
    function NgAisNumericSelectorModule() {
    }
    NgAisNumericSelectorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericSelector],
                    entryComponents: [NgAisNumericSelector],
                    exports: [NgAisNumericSelector],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericSelectorModule.ctorParameters = function () { return []; };
    return NgAisNumericSelectorModule;
}());
export { NgAisNumericSelectorModule };
//# sourceMappingURL=numeric-selector.module.js.map
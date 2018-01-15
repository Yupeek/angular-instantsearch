import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericRange } from "./numeric-range";
var NgAisNumericRangeModule = /** @class */ (function () {
    function NgAisNumericRangeModule() {
    }
    NgAisNumericRangeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericRange],
                    entryComponents: [NgAisNumericRange],
                    exports: [NgAisNumericRange],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericRangeModule.ctorParameters = function () { return []; };
    return NgAisNumericRangeModule;
}());
export { NgAisNumericRangeModule };
//# sourceMappingURL=numeric-range.module.js.map
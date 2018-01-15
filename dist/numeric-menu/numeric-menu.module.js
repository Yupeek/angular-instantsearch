import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericMenu } from "./numeric-menu";
var NgAisNumericMenuModule = /** @class */ (function () {
    function NgAisNumericMenuModule() {
    }
    NgAisNumericMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericMenu],
                    entryComponents: [NgAisNumericMenu],
                    exports: [NgAisNumericMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericMenuModule.ctorParameters = function () { return []; };
    return NgAisNumericMenuModule;
}());
export { NgAisNumericMenuModule };
//# sourceMappingURL=numeric-menu.module.js.map
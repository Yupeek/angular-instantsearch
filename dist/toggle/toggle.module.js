import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisToggle } from "./toggle";
var NgAisToggleModule = /** @class */ (function () {
    function NgAisToggleModule() {
    }
    NgAisToggleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisToggle],
                    entryComponents: [NgAisToggle],
                    exports: [NgAisToggle],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisToggleModule.ctorParameters = function () { return []; };
    return NgAisToggleModule;
}());
export { NgAisToggleModule };
//# sourceMappingURL=toggle.module.js.map
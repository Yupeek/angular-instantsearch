import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisMenu } from "./menu";
var NgAisMenuModule = /** @class */ (function () {
    function NgAisMenuModule() {
    }
    NgAisMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisMenu],
                    entryComponents: [NgAisMenu],
                    exports: [NgAisMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisMenuModule.ctorParameters = function () { return []; };
    return NgAisMenuModule;
}());
export { NgAisMenuModule };
//# sourceMappingURL=menu.module.js.map
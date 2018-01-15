import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisStats } from "./stats";
var NgAisStatsModule = /** @class */ (function () {
    function NgAisStatsModule() {
    }
    NgAisStatsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisStats],
                    entryComponents: [NgAisStats],
                    exports: [NgAisStats],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisStatsModule.ctorParameters = function () { return []; };
    return NgAisStatsModule;
}());
export { NgAisStatsModule };
//# sourceMappingURL=stats.module.js.map
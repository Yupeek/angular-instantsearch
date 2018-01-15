import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisRatingMenu } from "./rating-menu";
var NgAisRatingMenuModule = /** @class */ (function () {
    function NgAisRatingMenuModule() {
    }
    NgAisRatingMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRatingMenu],
                    entryComponents: [NgAisRatingMenu],
                    exports: [NgAisRatingMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisRatingMenuModule.ctorParameters = function () { return []; };
    return NgAisRatingMenuModule;
}());
export { NgAisRatingMenuModule };
//# sourceMappingURL=rating-menu.module.js.map
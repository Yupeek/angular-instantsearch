import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisSortBy } from "./sort-by";
var NgAisSortByModule = /** @class */ (function () {
    function NgAisSortByModule() {
    }
    NgAisSortByModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSortBy],
                    entryComponents: [NgAisSortBy],
                    exports: [NgAisSortBy],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisSortByModule.ctorParameters = function () { return []; };
    return NgAisSortByModule;
}());
export { NgAisSortByModule };
//# sourceMappingURL=sort-by.module.js.map
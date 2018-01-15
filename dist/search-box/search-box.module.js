import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisSearchBox } from "./search-box";
var NgAisSearchBoxModule = /** @class */ (function () {
    function NgAisSearchBoxModule() {
    }
    NgAisSearchBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSearchBox],
                    entryComponents: [NgAisSearchBox],
                    exports: [NgAisSearchBox],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisSearchBoxModule.ctorParameters = function () { return []; };
    return NgAisSearchBoxModule;
}());
export { NgAisSearchBoxModule };
//# sourceMappingURL=search-box.module.js.map
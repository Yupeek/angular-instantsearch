import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisPagination } from "./pagination";
var NgAisPaginationModule = /** @class */ (function () {
    function NgAisPaginationModule() {
    }
    NgAisPaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisPagination],
                    entryComponents: [NgAisPagination],
                    exports: [NgAisPagination],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisPaginationModule.ctorParameters = function () { return []; };
    return NgAisPaginationModule;
}());
export { NgAisPaginationModule };
//# sourceMappingURL=pagination.module.js.map
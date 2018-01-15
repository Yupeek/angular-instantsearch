import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisResultsPerPage } from "./results-per-page";
var NgAisResultsPerPageModule = /** @class */ (function () {
    function NgAisResultsPerPageModule() {
    }
    NgAisResultsPerPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisResultsPerPage],
                    entryComponents: [NgAisResultsPerPage],
                    exports: [NgAisResultsPerPage],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisResultsPerPageModule.ctorParameters = function () { return []; };
    return NgAisResultsPerPageModule;
}());
export { NgAisResultsPerPageModule };
//# sourceMappingURL=results-per-page.module.js.map
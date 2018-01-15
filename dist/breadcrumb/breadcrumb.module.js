import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisBreadcrumb } from "./breadcrumb";
var NgAisBreadcrumbModule = /** @class */ (function () {
    function NgAisBreadcrumbModule() {
    }
    NgAisBreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisBreadcrumb],
                    entryComponents: [NgAisBreadcrumb],
                    exports: [NgAisBreadcrumb],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisBreadcrumbModule.ctorParameters = function () { return []; };
    return NgAisBreadcrumbModule;
}());
export { NgAisBreadcrumbModule };
//# sourceMappingURL=breadcrumb.module.js.map
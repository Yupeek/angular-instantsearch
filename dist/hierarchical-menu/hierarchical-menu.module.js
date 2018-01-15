import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHierarchicalMenu } from "./hierarchical-menu";
import { NgAisHierarchicalMenuItem } from "./hierarchical-menu-item";
var NgAisHierarchicalMenuModule = /** @class */ (function () {
    function NgAisHierarchicalMenuModule() {
    }
    NgAisHierarchicalMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
                    entryComponents: [NgAisHierarchicalMenu],
                    exports: [NgAisHierarchicalMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisHierarchicalMenuModule.ctorParameters = function () { return []; };
    return NgAisHierarchicalMenuModule;
}());
export { NgAisHierarchicalMenuModule };
//# sourceMappingURL=hierarchical-menu.module.js.map
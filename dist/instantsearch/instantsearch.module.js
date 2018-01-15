import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgAisInstantSearch } from "./instantsearch";
import { NgAisInstance } from "./instantsearch-instance";
var NgAisInstantSearchModule = /** @class */ (function () {
    function NgAisInstantSearchModule() {
    }
    NgAisInstantSearchModule.forRoot = function () {
        return {
            ngModule: NgAisInstantSearchModule,
            providers: [NgAisInstance]
        };
    };
    NgAisInstantSearchModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisInstantSearch],
                    entryComponents: [NgAisInstantSearch],
                    exports: [NgAisInstantSearch],
                    imports: [CommonModule, HttpClientModule]
                },] },
    ];
    /** @nocollapse */
    NgAisInstantSearchModule.ctorParameters = function () { return []; };
    return NgAisInstantSearchModule;
}());
export { NgAisInstantSearchModule };
//# sourceMappingURL=instantsearch.module.js.map
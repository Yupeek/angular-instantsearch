import { NgModule } from "@angular/core";
// Modules
import { NgAisBreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { NgAisClearRefinementsModule } from "./clear-refinements/clear-refinements.module";
import { NgAisCurrentRefinementsModule } from "./current-refinements/current-refinements.module";
import { NgAisHierarchicalMenuModule } from "./hierarchical-menu/hierarchical-menu.module";
import { NgAisRefinementSelectModule } from "./refinement-select/refinement-select.module";
import { NgAisResultsPerPageModule } from "./results-per-page/results-per-page.module";
import { NgAisResultsModule } from "./results/results.module";
import { NgAisInfiniteResultsModule } from "./infinite-results/infinite-results.module";
import { NgAisInstantSearchModule } from "./instantsearch/instantsearch.module";
import { NgAisMenuModule } from "./menu/menu.module";
import { NgAisNumericMenuModule } from "./numeric-menu/numeric-menu.module";
import { NgAisNumericSelectorModule } from "./numeric-selector/numeric-selector.module";
import { NgAisPaginationModule } from "./pagination/pagination.module";
import { NgAisRangeSliderModule } from "./range-slider/range-slider.module";
import { NgAisRefinementListModule } from "./refinement-list/refinement-list.module";
import { NgAisSearchBoxModule } from "./search-box/search-box.module";
import { NgAisSortByModule } from "./sort-by/sort-by.module";
import { NgAisRatingMenuModule } from "./rating-menu/rating-menu.module";
import { NgAisStatsModule } from "./stats/stats.module";
import { NgAisToggleModule } from "./toggle/toggle.module";
import { NgAisHighlightModule } from "./highlight/highlight.module";
import { NgAisNumericRangeModule } from "./numeric-range/numeric-range.module";
// Custom SSR algoliasearchClient
import { createSSRAlgoliaClient } from "./create-ssr-algolia-client";
export { createSSRAlgoliaClient };
import { parseServerRequest } from "./parse-server-request";
export { parseServerRequest };
var NGIS_MODULES = [
    NgAisInstantSearchModule,
    NgAisResultsModule,
    NgAisSearchBoxModule,
    NgAisClearRefinementsModule,
    NgAisMenuModule,
    NgAisPaginationModule,
    NgAisRefinementListModule,
    NgAisRefinementSelectModule,
    NgAisResultsPerPageModule,
    NgAisSortByModule,
    NgAisNumericSelectorModule,
    NgAisNumericMenuModule,
    NgAisStatsModule,
    NgAisToggleModule,
    NgAisInfiniteResultsModule,
    NgAisCurrentRefinementsModule,
    NgAisHierarchicalMenuModule,
    NgAisRatingMenuModule,
    NgAisRangeSliderModule,
    NgAisBreadcrumbModule,
    NgAisHighlightModule,
    NgAisNumericRangeModule
];
var NgAisRootModule = /** @class */ (function () {
    function NgAisRootModule() {
    }
    NgAisRootModule.decorators = [
        { type: NgModule, args: [{
                    exports: NGIS_MODULES,
                    imports: [NgAisInstantSearchModule.forRoot()]
                },] },
    ];
    /** @nocollapse */
    NgAisRootModule.ctorParameters = function () { return []; };
    return NgAisRootModule;
}());
export { NgAisRootModule };
var NgAisModule = /** @class */ (function () {
    function NgAisModule() {
    }
    NgAisModule.forRoot = function () {
        return { ngModule: NgAisRootModule };
    };
    NgAisModule.decorators = [
        { type: NgModule, args: [{ imports: NGIS_MODULES, exports: NGIS_MODULES },] },
    ];
    /** @nocollapse */
    NgAisModule.ctorParameters = function () { return []; };
    return NgAisModule;
}());
export { NgAisModule };
//# sourceMappingURL=index.js.map
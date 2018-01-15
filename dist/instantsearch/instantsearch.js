import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgAisInstance } from "./instantsearch-instance";
var NgAisInstantSearch = /** @class */ (function () {
    function NgAisInstantSearch(searchInstance) {
        var _this = this;
        this.searchInstance = searchInstance;
        this.change = new EventEmitter();
        this.onInstantSearchRender = function () {
            var results = _this.searchInstance.getResults();
            var state = _this.searchInstance.getState();
            _this.change.emit({ results: results, state: state });
        };
    }
    NgAisInstantSearch.prototype.ngOnInit = function () {
        this.searchInstance.init(this.config);
        this.searchInstance.on("render", this.onInstantSearchRender);
    };
    NgAisInstantSearch.prototype.ngAfterViewInit = function () {
        this.searchInstance.start();
    };
    NgAisInstantSearch.prototype.ngOnDestroy = function () {
        this.searchInstance.off("render", this.onInstantSearchRender);
    };
    NgAisInstantSearch.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-instantsearch",
                    template: "<ng-content></ng-content>"
                },] },
    ];
    /** @nocollapse */
    NgAisInstantSearch.ctorParameters = function () { return [
        { type: NgAisInstance, },
    ]; };
    NgAisInstantSearch.propDecorators = {
        'config': [{ type: Input },],
        'change': [{ type: Output },],
    };
    return NgAisInstantSearch;
}());
export { NgAisInstantSearch };
//# sourceMappingURL=instantsearch.js.map
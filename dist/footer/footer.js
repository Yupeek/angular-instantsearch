import { Component, Input } from "@angular/core";
var NgAisFooter = /** @class */ (function () {
    function NgAisFooter() {
    }
    NgAisFooter.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-footer",
                    template: "\n    <div *ngIf=\"footer\" class=\"{{className}}\">\n      {{footer}}\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisFooter.ctorParameters = function () { return []; };
    NgAisFooter.propDecorators = {
        'footer': [{ type: Input },],
        'className': [{ type: Input },],
    };
    return NgAisFooter;
}());
export { NgAisFooter };
//# sourceMappingURL=footer.js.map
import { Component, Input } from "@angular/core";
var NgAisHeader = /** @class */ (function () {
    function NgAisHeader() {
    }
    NgAisHeader.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-header",
                    template: "\n    <div *ngIf=\"header\" class=\"{{className}}\">\n      {{header}}\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisHeader.ctorParameters = function () { return []; };
    NgAisHeader.propDecorators = {
        'header': [{ type: Input },],
        'className': [{ type: Input },],
    };
    return NgAisHeader;
}());
export { NgAisHeader };
//# sourceMappingURL=header.js.map
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisRangeSlider } from "./range-slider";
var NgAisRangeSliderModule = /** @class */ (function () {
    function NgAisRangeSliderModule() {
    }
    NgAisRangeSliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRangeSlider],
                    entryComponents: [NgAisRangeSlider],
                    exports: [NgAisRangeSlider],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisRangeSliderModule.ctorParameters = function () { return []; };
    return NgAisRangeSliderModule;
}());
export { NgAisRangeSliderModule };
//# sourceMappingURL=range-slider.module.js.map
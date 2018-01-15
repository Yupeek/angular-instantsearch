import { Input } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { noop } from "lodash-es";
import { bem } from "./utils";
var Widget = /** @class */ (function () {
    function Widget() {
    }
    return Widget;
}());
export { Widget };
var BaseWidget = /** @class */ (function () {
    function BaseWidget(searchInstance, widgetName) {
        var _this = this;
        this.searchInstance = searchInstance;
        this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                return Promise.resolve().then(function () {
                    _this.state = state;
                });
            }
            _this.state = state;
        };
        this.cx = bem(widgetName);
    }
    BaseWidget.prototype.createWidget = function (connector, options) {
        if (options === void 0) { options = {}; }
        this.widget = connector(this.updateState, noop)(options);
    };
    BaseWidget.prototype.ngOnInit = function () {
        this.searchInstance.addWidget(this.widget);
    };
    BaseWidget.prototype.ngOnDestroy = function () {
        if (isPlatformBrowser(this.plateformId)) {
            this.searchInstance.removeWidget(this.widget);
        }
    };
    BaseWidget.propDecorators = {
        'header': [{ type: Input },],
        'footer': [{ type: Input },],
    };
    return BaseWidget;
}());
export { BaseWidget };
//# sourceMappingURL=base-widget.js.map
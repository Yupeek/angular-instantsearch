var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID } from "@angular/core";
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
var NgAisSearchBox = /** @class */ (function (_super) {
    __extends(NgAisSearchBox, _super);
    function NgAisSearchBox(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "SearchBox") || this;
        _this.platformId = platformId;
        _this.placeholder = "Search";
        _this.submitTitle = "Submit";
        _this.resetTitle = "Reset";
        _this.searchAsYouType = true;
        // Output events
        // form
        _this.submit = new EventEmitter();
        _this.reset = new EventEmitter();
        // input
        _this.change = new EventEmitter();
        _this.focus = new EventEmitter();
        _this.blur = new EventEmitter();
        _this.state = {
            query: "",
            refine: noop
        };
        _this.createWidget(connectSearchBox);
        return _this;
    }
    NgAisSearchBox.prototype.handleChange = function (query) {
        this.change.emit(query);
        if (this.searchAsYouType) {
            this.state.refine(query);
        }
    };
    NgAisSearchBox.prototype.handleSubmit = function (event) {
        // send submit event to parent component
        this.submit.emit(event);
        event.preventDefault();
        if (!this.searchAsYouType) {
            this.state.refine(this.state.query);
        }
    };
    NgAisSearchBox.prototype.handleReset = function (event) {
        // send reset event to parent component
        this.reset.emit(event);
        // reset search
        this.state.refine("");
    };
    NgAisSearchBox.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-search-box",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <form\n          [class]=\"cx('form')\"\n          novalidate\n          (submit)=\"handleSubmit($event)\"\n        >\n          <input\n            [class]=\"cx('input')\"\n            autocapitalize=\"off\"\n            autocorrect=\"off\"\n            placeholder=\"{{placeholder}}\"\n            role=\"textbox\"\n            spellcheck=\"false\"\n            type=\"text\"\n            [value]=\"state.query\"\n            (input)=\"handleChange($event.target.value)\"\n            (focus)=\"focus.emit($event)\"\n            (blur)=\"blur.emit($event)\"\n          />\n\n          <button\n            [class]=\"cx('submit')\"\n            type=\"submit\"\n            title=\"{{submitTitle}}\"\n            (click)=\"handleSubmit($event)\"\n          >\n            <svg\n              [ngClass]=\"cx('submitIcon')\"\n              viewBox=\"0 0 40 40\"\n              width=\"40\"\n              height=\"40\"\n            >\n              <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n            </svg>\n          </button>\n\n          <button\n            [class]=\"cx('reset')\"\n            type=\"reset\"\n            title=\"{{resetTitle}}\"\n            (click)=\"handleReset($event)\"\n            style=\"display: none\"\n          >\n            <svg\n              [ngClass]=\"cx('resetIcon')\"\n              viewBox=\"0 0 20 20\"\n              width=\"20\"\n              height=\"20\"\n            >\n              <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n            </svg>\n          </button>\n        </form>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [class]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisSearchBox.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisSearchBox.propDecorators = {
        'placeholder': [{ type: Input },],
        'submitTitle': [{ type: Input },],
        'resetTitle': [{ type: Input },],
        'searchAsYouType': [{ type: Input },],
        'submit': [{ type: Output },],
        'reset': [{ type: Output },],
        'change': [{ type: Output },],
        'focus': [{ type: Output },],
        'blur': [{ type: Output },],
    };
    return NgAisSearchBox;
}(BaseWidget));
export { NgAisSearchBox };
//# sourceMappingURL=search-box.js.map
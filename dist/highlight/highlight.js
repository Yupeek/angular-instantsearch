import { Component, Input } from "@angular/core";
import { isPlainObject, get } from "lodash-es";
import { bem } from "../utils";
var NgAisHighlight = /** @class */ (function () {
    function NgAisHighlight() {
        this.tagName = "em";
        this.cx = bem("Highlight")();
    }
    Object.defineProperty(NgAisHighlight.prototype, "content", {
        get: function () {
            if (this.attributeName === "highlighted") {
                return this.hit.highlighted
                    ? this.replaceWithTagName(this.hit.highlighted)
                    : this.hit.label;
            }
            if (this.hit.hasOwnProperty("_highlightResult")) {
                var attributeHighlighted = get(this.hit._highlightResult, this.attributeName);
                // check that the attributeHighlighted is a string
                if (isPlainObject(attributeHighlighted) &&
                    typeof attributeHighlighted.value === "string") {
                    return this.replaceWithTagName(attributeHighlighted.value);
                }
            }
            var fallback = get(this.hit, this.attributeName);
            if (!fallback) {
                console.warn("Could not find attributeName [" + this.attributeName + "] into hit object, will display an empty string.");
                return "";
            }
            return fallback;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHighlight.prototype.replaceWithTagName = function (value) {
        return value
            .replace(new RegExp("<em>", "g"), "<" + this.tagName + " class=\"" + this.cx + "\">")
            .replace(new RegExp("</em>", "g"), "</" + this.tagName + ">");
    };
    NgAisHighlight.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-highlight",
                    template: "<span [innerHtml]=\"content\"></span>"
                },] },
    ];
    /** @nocollapse */
    NgAisHighlight.ctorParameters = function () { return []; };
    NgAisHighlight.propDecorators = {
        'attributeName': [{ type: Input },],
        'hit': [{ type: Input },],
        'tagName': [{ type: Input },],
    };
    return NgAisHighlight;
}());
export { NgAisHighlight };
//# sourceMappingURL=highlight.js.map
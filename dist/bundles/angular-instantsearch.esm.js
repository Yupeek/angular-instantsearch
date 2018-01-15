import { Component, ContentChild, EventEmitter, Inject, Injectable, Input, NgModule, Output, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { connectBreadcrumb, connectClearAll, connectCurrentRefinedValues, connectHierarchicalMenu, connectHits, connectHitsPerPage, connectInfiniteHits, connectMenu, connectNumericRefinementList, connectNumericSelector, connectPagination, connectRange, connectRefinementList, connectSearchBox, connectSortBySelector, connectStarRating, connectStats, connectToggle } from 'instantsearch.js/es/connectors';
import { get, isFunction, isPlainObject, noop, range } from 'lodash-es';
import instantsearch from 'instantsearch.js/es';
import { HttpClientModule } from '@angular/common/http';
import { create } from 'nouislider';
import * as algoliasearchProxy from 'algoliasearch/index';
import algoliasearchProxy__default from 'algoliasearch/index';
import * as encodeProxy from 'querystring-es3/encode';
import encodeProxy__default from 'querystring-es3/encode';
import { AlgoliaSearchHelper } from 'algoliasearch-helper';

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

var NgAisFooterModule = /** @class */ (function () {
    function NgAisFooterModule() {
    }
    NgAisFooterModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisFooter],
                    entryComponents: [NgAisFooter],
                    exports: [NgAisFooter],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    NgAisFooterModule.ctorParameters = function () { return []; };
    return NgAisFooterModule;
}());

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

var NgAisHeaderModule = /** @class */ (function () {
    function NgAisHeaderModule() {
    }
    NgAisHeaderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHeader],
                    entryComponents: [NgAisHeader],
                    exports: [NgAisHeader],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    NgAisHeaderModule.ctorParameters = function () { return []; };
    return NgAisHeaderModule;
}());

function bem(widgetName) {
    var cx = function (element, subElement) {
        if (element) {
            var scoppedWidgetName = "ais-" + widgetName + "-" + element;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === "header" || element === "body" || element === "footer") {
                var nonScoppedWidgetName = "ais-" + element;
                return scoppedWidgetName + " " + nonScoppedWidgetName;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return scoppedWidgetName + "--" + subElement;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        else {
            // output `ais-Widget`
            return "ais-" + widgetName;
        }
    };
    return cx;
}
function parseNumberInput(input) {
    return typeof input === "string" ? parseInt(input, 10) : input;
}

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

var VERSION = "1.0.0-beta.7";

var NgAisInstance = /** @class */ (function () {
    function NgAisInstance(platformId) {
        this.platformId = platformId;
    }
    NgAisInstance.prototype.init = function (config) {
        // add default searchParameters with highlighting config
        if (!config.searchParameters)
            config.searchParameters = {};
        Object.assign(config.searchParameters, {
            highlightPreTag: "__ais-highlight__",
            highlightPostTag: "__/ais-highlight__"
        });
        // remove URLSync widget if on SSR
        if (!isPlatformBrowser(this.platformId)) {
            config.urlSync = false;
        }
        // custom algolia client agent
        if (!config.createAlgoliaClient) {
            config.createAlgoliaClient = function (algoliasearch, appId, apiKey) {
                var client = algoliasearch(appId, apiKey);
                client.addAlgoliaAgent("angular-instantsearch " + VERSION);
                return client;
            };
        }
        this.instance = instantsearch(config);
    };
    NgAisInstance.prototype.start = function () {
        this.instance.start();
    };
    NgAisInstance.prototype.addWidget = function (widget) {
        this.instance.addWidget(widget);
    };
    NgAisInstance.prototype.addWidgets = function (widgets) {
        this.instance.addWidgets(widgets);
    };
    NgAisInstance.prototype.removeWidget = function (widget) {
        this.instance.removeWidget(widget);
    };
    NgAisInstance.prototype.removeWidgets = function (widgets) {
        this.instance.removeWidgets(widgets);
    };
    NgAisInstance.prototype.on = function (eventName, callback) {
        this.instance.on(eventName, callback);
    };
    NgAisInstance.prototype.off = function (eventName, callback) {
        this.instance.removeListener(eventName, callback);
    };
    NgAisInstance.prototype.getResults = function () {
        return this.instance.helper.lastResults;
    };
    NgAisInstance.prototype.getState = function () {
        return this.instance.helper.state;
    };
    NgAisInstance.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgAisInstance.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    return NgAisInstance;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisBreadcrumb = /** @class */ (function (_super) {
    __extends(NgAisBreadcrumb, _super);
    function NgAisBreadcrumb(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Breadcrumb") || this;
        _this.platformId = platformId;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisBreadcrumb.prototype, "itemsWithSeparator", {
        get: function () {
            var _this = this;
            return this.state.items.reduce(function (result, curr, idx) {
                return idx === _this.state.items.length - 1
                    ? result.concat([curr]) : result.concat([curr, { separator: true }]);
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    NgAisBreadcrumb.prototype.ngOnInit = function () {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisBreadcrumb.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    };
    NgAisBreadcrumb.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-breadcrumb",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngFor=\"let item of itemsWithSeparator\"\n            [class]=\"cx('item')\"\n            [attr.aria-hidden]=\"item.separator\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.separator ? '>' : ''}}\n            <a\n              [class]=\"cx('link')\"\n              href=\"{{state.createURL(item.value)}}\"\n              *ngIf=\"!item.separator\"\n              (click)=\"handleClick($event, item)\"\n            >\n              {{item.name}}\n            </a>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisBreadcrumb.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisBreadcrumb.propDecorators = {
        'attributes': [{ type: Input },],
        'rootPath': [{ type: Input },],
    };
    return NgAisBreadcrumb;
}(BaseWidget));

var NgAisBreadcrumbModule = /** @class */ (function () {
    function NgAisBreadcrumbModule() {
    }
    NgAisBreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisBreadcrumb],
                    entryComponents: [NgAisBreadcrumb],
                    exports: [NgAisBreadcrumb],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisBreadcrumbModule.ctorParameters = function () { return []; };
    return NgAisBreadcrumbModule;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisClearRefinements = /** @class */ (function (_super) {
    __extends$1(NgAisClearRefinements, _super);
    function NgAisClearRefinements(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "ClearRefinements") || this;
        _this.platformId = platformId;
        _this.buttonLabel = "Clear refinements";
        _this.clearsQuery = false;
        _this.excludeAttributes = [];
        _this.state = { hasRefinements: false, refine: noop };
        return _this;
    }
    NgAisClearRefinements.prototype.ngOnInit = function () {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisClearRefinements.prototype.handleClick = function (event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    };
    NgAisClearRefinements.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-clear-refinements",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <button\n          [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n          (click)=\"handleClick($event)\"\n          [disabled]=\"!state.hasRefinements\"\n        >\n          {{buttonLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisClearRefinements.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisClearRefinements.propDecorators = {
        'buttonLabel': [{ type: Input },],
        'clearsQuery': [{ type: Input },],
        'excludeAttributes': [{ type: Input },],
    };
    return NgAisClearRefinements;
}(BaseWidget));

var NgAisClearRefinementsModule = /** @class */ (function () {
    function NgAisClearRefinementsModule() {
    }
    NgAisClearRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisClearRefinements],
                    entryComponents: [NgAisClearRefinements],
                    exports: [NgAisClearRefinements],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisClearRefinementsModule.ctorParameters = function () { return []; };
    return NgAisClearRefinementsModule;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisCurrentRefinements = /** @class */ (function (_super) {
    __extends$2(NgAisCurrentRefinements, _super);
    function NgAisCurrentRefinements(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "CurrentRefinements") || this;
        _this.platformId = platformId;
        // render options
        _this.clearRefinements = "before";
        _this.clearRefinementsLabel = "Clear refinements";
        // connector options
        _this.onlyListedAttributes = false;
        _this.clearsQuery = false;
        _this.attributes = [];
        _this.state = {
            attributes: {},
            clearAllClick: noop,
            clearAllURL: noop,
            createURL: noop,
            refine: noop,
            refinements: []
        };
        return _this;
    }
    Object.defineProperty(NgAisCurrentRefinements.prototype, "refinements", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.refinements)
                : this.state.refinements;
        },
        enumerable: true,
        configurable: true
    });
    NgAisCurrentRefinements.prototype.ngOnInit = function () {
        this.createWidget(connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisCurrentRefinements.prototype.handleClick = function (event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    };
    NgAisCurrentRefinements.prototype.handleClearAllClick = function (event) {
        event.preventDefault();
        this.state.clearAllClick();
    };
    NgAisCurrentRefinements.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-current-refinements",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <button\n          [class]=\"cx('reset')\"\n          (click)=\"handleClearAllClick($event)\"\n          *ngIf=\"clearRefinements === 'before' || clearRefinements === true\">\n          {{clearRefinementsLabel}}\n        </button>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let refinement of refinements\"\n            (click)=\"handleClick($event, refinement)\"\n          >\n            <button [class]=\"cx('button')\">\n              {{refinement.computedLabel}}\n              <span [class]=\"cx('count')\">{{refinement.count}}</span>\n            </button>\n          </li>\n        </ul>\n\n        <button\n          [class]=\"cx('reset')\"\n          (click)=\"handleClearAllClick($event)\"\n          *ngIf=\"clearRefinements === 'after'\">\n          {{clearRefinementsLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisCurrentRefinements.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisCurrentRefinements.propDecorators = {
        'clearRefinements': [{ type: Input },],
        'clearRefinementsLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'onlyListedAttributes': [{ type: Input },],
        'clearsQuery': [{ type: Input },],
        'attributes': [{ type: Input },],
    };
    return NgAisCurrentRefinements;
}(BaseWidget));

var NgAisCurrentRefinementsModule = /** @class */ (function () {
    function NgAisCurrentRefinementsModule() {
    }
    NgAisCurrentRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisCurrentRefinements],
                    entryComponents: [NgAisCurrentRefinements],
                    exports: [NgAisCurrentRefinements],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisCurrentRefinementsModule.ctorParameters = function () { return []; };
    return NgAisCurrentRefinementsModule;
}());

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisHierarchicalMenu = /** @class */ (function (_super) {
    __extends$3(NgAisHierarchicalMenu, _super);
    function NgAisHierarchicalMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "HierarchicalMenu") || this;
        _this.platformId = platformId;
        _this.separator = " > ";
        _this.limit = 10;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHierarchicalMenu.prototype.ngOnInit = function () {
        this.createWidget(connectHierarchicalMenu, {
            limit: parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisHierarchicalMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-hierarchical-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list') + ' ' + cx('list', 'lvl0')\">\n          <ng-ais-hierarchical-menu-item\n            *ngFor=\"let item of items\"\n            [item]=\"item\"\n            [createURL]=\"state.createURL\"\n            [refine]=\"state.refine\"\n          >\n          </ng-ais-hierarchical-menu-item>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisHierarchicalMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisHierarchicalMenu.propDecorators = {
        'transformItems': [{ type: Input },],
        'attributes': [{ type: Input },],
        'separator': [{ type: Input },],
        'rootPath': [{ type: Input },],
        'showParentLevel': [{ type: Input },],
        'limit': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisHierarchicalMenu;
}(BaseWidget));

var NgAisHierarchicalMenuItem = /** @class */ (function () {
    function NgAisHierarchicalMenuItem() {
        this.lvl = 1;
        this.cx = bem("HierarchicalMenu");
    }
    NgAisHierarchicalMenuItem.prototype.isArray = function (potentialArray) {
        return Array.isArray(potentialArray);
    };
    NgAisHierarchicalMenuItem.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.refine(item.value);
    };
    NgAisHierarchicalMenuItem.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-hierarchical-menu-item",
                    template: "\n    <li\n      [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n      (click)=\"handleClick($event, item)\"\n    >\n      <a\n        [class]=\"cx('link')\"\n        href=\"{{createURL(item.value)}}\"\n        (click)=\"handleClick($event, item)\"\n      >\n        {{item.label}}\n        <span [class]=\"cx('count')\">\n          {{item.count}}\n        </span>\n      </a>\n\n      <ul\n        [class]=\"cx('list') + ' ' + cx('list', 'lvl' + lvl)\"\n        *ngIf=\"item.isRefined && isArray(item.data) && item.data.length > 0\"\n      >\n        <ng-ais-hierarchical-menu-item\n          *ngFor=\"let child of item.data\"\n          [item]=\"child\"\n          [createURL]=\"createURL\"\n          [refine]=\"refine\"\n          [lvl]=\"lvl + 1\"\n        >\n        </ng-ais-hierarchical-menu-item>\n      </ul>\n    </li>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisHierarchicalMenuItem.ctorParameters = function () { return []; };
    NgAisHierarchicalMenuItem.propDecorators = {
        'lvl': [{ type: Input },],
        'refine': [{ type: Input },],
        'createURL': [{ type: Input },],
        'item': [{ type: Input },],
    };
    return NgAisHierarchicalMenuItem;
}());

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

var NgAisHighlightModule = /** @class */ (function () {
    function NgAisHighlightModule() {
    }
    NgAisHighlightModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHighlight],
                    entryComponents: [NgAisHighlight],
                    exports: [NgAisHighlight],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    NgAisHighlightModule.ctorParameters = function () { return []; };
    return NgAisHighlightModule;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisRefinementSelect = /** @class */ (function (_super) {
    __extends$4(NgAisRefinementSelect, _super);
    function NgAisRefinementSelect(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RefinementSelect") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.searchPlaceholder = "Search here...";
        _this.operator = "or";
        _this.limitMin = 10;
        // inner state
        _this.searchQuery = "";
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false
        };
        return _this;
    }
    Object.defineProperty(NgAisRefinementSelect.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisRefinementSelect.prototype.ngOnInit = function () {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limitMin),
            showMoreLimit: parseNumberInput(this.limitMax),
            attributeName: this.attributeName,
            sortBy: this.sortBy,
            escapeFacetValues: true
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRefinementSelect.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    NgAisRefinementSelect.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.searchForItems(this.searchQuery);
    };
    NgAisRefinementSelect.prototype.handleChange = function (value) {
        this.searchQuery = value;
        this.state.searchForItems(value);
    };
    NgAisRefinementSelect.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-refinement-select",
                    template: "\n      <div [class]=\"cx()\">\n          <p>it works</p>\n          <!--<ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>-->\n\n          <!--<div [class]=\"cx('body')\">-->\n              <!--<form-->\n                      <!--[class]=\"cx('form')\"-->\n                      <!--*ngIf=\"withSearchBox\"-->\n                      <!--(submit)=\"handleSubmit($event)\"-->\n                      <!--novalidate-->\n              <!--&gt;-->\n                  <!--<input-->\n                          <!--[class]=\"cx('input')\"-->\n                          <!--autocapitalize=\"off\"-->\n                          <!--autocorrect=\"off\"-->\n                          <!--placeholder=\"{{searchPlaceholder}}\"-->\n                          <!--role=\"textbox\"-->\n                          <!--spellcheck=\"false\"-->\n                          <!--type=\"text\"-->\n                          <!--[value]=\"searchQuery\"-->\n                          <!--(input)=\"handleChange($event.target.value)\"-->\n                  <!--/>-->\n              <!--</form>-->\n\n              <!--<select [class]=\"cx('list')\">-->\n                  <!--<option [class]=\"cx('item') + (item.isRefined ? cx('item', 'selected') : '')\"-->\n                          <!--*ngFor=\"let item of items\"-->\n                          <!--(click)=\"refine($event, item)\"-->\n                          <!--value=\"{{item.value}}\"-->\n                  <!--&gt;-->\n                    <!--<span [class]=\"cx('label')\">-->\n                      <!--<ng-ais-highlight-->\n                              <!--attributeName=\"highlighted\"-->\n                              <!--[hit]=\"item\"-->\n                      <!--&gt;-->\n                      <!--</ng-ais-highlight>-->\n                      <!--<span [class]=\"cx('count')\">-->\n                        <!--{{item.count}}-->\n                      <!--</span>-->\n                    <!--</span>-->\n                  <!--</option>-->\n              <!--</select>-->\n\n              <!--<button-->\n                      <!--*ngIf=\"state.canToggleShowMore\"-->\n                      <!--(click)=\"state.toggleShowMore()\"-->\n              <!--&gt;-->\n                  <!--{{state.isShowingMore ? showLessLabel : showMoreLabel}}-->\n              <!--</button>-->\n          <!--</div>-->\n\n          <!--<ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>-->\n      </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementSelect.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRefinementSelect.propDecorators = {
        'showMoreLabel': [{ type: Input },],
        'showLessLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'withSearchBox': [{ type: Input },],
        'searchPlaceholder': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'operator': [{ type: Input },],
        'limitMin': [{ type: Input },],
        'limitMax': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisRefinementSelect;
}(BaseWidget));

var NgAisRefinementSelectModule = /** @class */ (function () {
    function NgAisRefinementSelectModule() {
    }
    NgAisRefinementSelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRefinementSelect],
                    entryComponents: [NgAisRefinementSelect],
                    exports: [NgAisRefinementSelect],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementSelectModule.ctorParameters = function () { return []; };
    return NgAisRefinementSelectModule;
}());

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisResultsPerPage = /** @class */ (function (_super) {
    __extends$5(NgAisResultsPerPage, _super);
    function NgAisResultsPerPage(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "ResultsPerPage") || this;
        _this.platformId = platformId;
        _this.state = {
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisResultsPerPage.prototype.ngOnInit = function () {
        this.createWidget(connectHitsPerPage, { items: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisResultsPerPage.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-results-per-page",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.items\"\n            [value]=\"item.value\"\n            [selected]=\"item.isRefined\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisResultsPerPage.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisResultsPerPage.propDecorators = {
        'items': [{ type: Input },],
    };
    return NgAisResultsPerPage;
}(BaseWidget));

var NgAisResultsPerPageModule = /** @class */ (function () {
    function NgAisResultsPerPageModule() {
    }
    NgAisResultsPerPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisResultsPerPage],
                    entryComponents: [NgAisResultsPerPage],
                    exports: [NgAisResultsPerPage],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisResultsPerPageModule.ctorParameters = function () { return []; };
    return NgAisResultsPerPageModule;
}());

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var NgAisResults = /** @class */ (function (_super) {
    __extends$6(NgAisResults, _super);
    function NgAisResults(plateformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Results") || this;
        _this.plateformId = plateformId;
        // inner widget state returned from connector
        _this.state = { hits: [], results: {} };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: isFunction(_this.transformItems)
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectHits, { escapeHits: true });
        return _this;
    }
    NgAisResults.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-results",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n        <!-- default rendering if no template specified -->\n        <div *ngIf=\"!template\">\n          <ul [class]=\"cx('list')\">\n            <li\n              [class]=\"cx('item')\"\n              *ngFor=\"let hit of state.hits\"\n            >\n              <ng-ais-highlight attributeName=\"name\" [hit]=\"hit\">\n              </ng-ais-highlight>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisResults.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisResults.propDecorators = {
        'template': [{ type: ContentChild, args: [TemplateRef,] },],
        'transformItems': [{ type: Input },],
    };
    return NgAisResults;
}(BaseWidget));

var NgAisResultsModule = /** @class */ (function () {
    function NgAisResultsModule() {
    }
    NgAisResultsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisResults],
                    entryComponents: [NgAisResults],
                    exports: [NgAisResults],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisResultsModule.ctorParameters = function () { return []; };
    return NgAisResultsModule;
}());

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var NgAisInfiniteResults = /** @class */ (function (_super) {
    __extends$7(NgAisInfiniteResults, _super);
    function NgAisInfiniteResults(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "InfiniteResults") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more results";
        // inner widget state returned from connector
        _this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {}
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign$1({}, state, { results: state.results, hits: isFunction(_this.transformItems)
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectInfiniteHits, { escapeHits: true });
        return _this;
    }
    NgAisInfiniteResults.prototype.showMore = function (event) {
        event.preventDefault();
        this.state.showMore();
    };
    NgAisInfiniteResults.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-infinite-results",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n        <!-- default rendering if no template specified -->\n        <div *ngIf=\"!template\">\n          <ul [class]=\"cx('list')\">\n            <li\n              [class]=\"cx('item')\"\n              *ngFor=\"let hit of state.hits\"\n            >\n              <ng-ais-highlight attributeName=\"name\" [hit]=\"hit\">\n              </ng-ais-highlight>\n            </li>\n          </ul>\n        </div>\n\n        <button\n          [class]=\"cx('showMore')\"\n          (click)=\"showMore($event)\"\n          [disabled]=\"state.isLastPage\"\n        >\n          {{showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisInfiniteResults.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisInfiniteResults.propDecorators = {
        'template': [{ type: ContentChild, args: [TemplateRef,] },],
        'showMoreLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
    };
    return NgAisInfiniteResults;
}(BaseWidget));

var NgAisInfiniteResultsModule = /** @class */ (function () {
    function NgAisInfiniteResultsModule() {
    }
    NgAisInfiniteResultsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisInfiniteResults],
                    entryComponents: [NgAisInfiniteResults],
                    exports: [NgAisInfiniteResults],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisInfiniteResultsModule.ctorParameters = function () { return []; };
    return NgAisInfiniteResultsModule;
}());

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

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisMenu = /** @class */ (function (_super) {
    __extends$8(NgAisMenu, _super);
    function NgAisMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Menu") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.limitMin = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisMenu.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisMenu.prototype.ngOnInit = function () {
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limitMin),
            showMoreLimit: parseNumberInput(this.limitMax),
            attributeName: this.attributeName,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisMenu.prototype.handleClick = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n            *ngFor=\"let item of items\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <a\n              href=\"{{state.createURL(item.value)}}\"\n              (click)=\"handleClick($event, item.value)\"\n            >\n              {{item.label}}\n              <span [class]=\"cx('count')\">{{item.count}}</span>\n            </a>\n          </li>\n        </ul>\n\n        <button\n          *ngIf=\"state.canToggleShowMore\"\n          (click)=\"state.toggleShowMore()\"\n          [class]=\"cx('showMore') + (!state.canToggleShowMore ? (' ' + cx('showMore', 'disabled')) : '')\"\n        >\n          {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisMenu.propDecorators = {
        'showMoreLabel': [{ type: Input },],
        'showLessLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'limitMin': [{ type: Input },],
        'limitMax': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisMenu;
}(BaseWidget));

var NgAisMenuModule = /** @class */ (function () {
    function NgAisMenuModule() {
    }
    NgAisMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisMenu],
                    entryComponents: [NgAisMenu],
                    exports: [NgAisMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisMenuModule.ctorParameters = function () { return []; };
    return NgAisMenuModule;
}());

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisNumericMenu = /** @class */ (function (_super) {
    __extends$9(NgAisNumericMenu, _super);
    function NgAisNumericMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "NumericMenu") || this;
        _this.platformId = platformId;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisNumericMenu.prototype.ngOnInit = function () {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attributeName,
            options: this.options
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericMenu.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    };
    NgAisNumericMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')\"\n            *ngFor=\"let item of state.items\"\n            (click)=\"refine($event, item)\"\n          >\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('radio')\"\n                type=\"radio\"\n                name=\"NumericRefinementList\"\n                [checked]=\"item.isRefined\"\n              />\n              {{item.label}}\n            </label>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisNumericMenu.propDecorators = {
        'attributeName': [{ type: Input },],
        'options': [{ type: Input },],
    };
    return NgAisNumericMenu;
}(BaseWidget));

var NgAisNumericMenuModule = /** @class */ (function () {
    function NgAisNumericMenuModule() {
    }
    NgAisNumericMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericMenu],
                    entryComponents: [NgAisNumericMenu],
                    exports: [NgAisNumericMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericMenuModule.ctorParameters = function () { return []; };
    return NgAisNumericMenuModule;
}());

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisNumericSelector = /** @class */ (function (_super) {
    __extends$10(NgAisNumericSelector, _super);
    function NgAisNumericSelector(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "NumericSelector") || this;
        _this.platformId = platformId;
        _this.operator = "=";
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop
        };
        return _this;
    }
    NgAisNumericSelector.prototype.ngOnInit = function () {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attributeName,
            operator: this.operator,
            options: this.options
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericSelector.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-selector",
                    template: "\n    <div [class]=\"cx('')\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.options\"\n            [value]=\"item.value\"\n            [selected]=\"item.value === state.currentRefinement\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericSelector.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisNumericSelector.propDecorators = {
        'attributeName': [{ type: Input },],
        'operator': [{ type: Input },],
        'options': [{ type: Input },],
    };
    return NgAisNumericSelector;
}(BaseWidget));

var NgAisNumericSelectorModule = /** @class */ (function () {
    function NgAisNumericSelectorModule() {
    }
    NgAisNumericSelectorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericSelector],
                    entryComponents: [NgAisNumericSelector],
                    exports: [NgAisNumericSelector],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericSelectorModule.ctorParameters = function () { return []; };
    return NgAisNumericSelectorModule;
}());

var __extends$11 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisPagination = /** @class */ (function (_super) {
    __extends$11(NgAisPagination, _super);
    function NgAisPagination(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Pagination") || this;
        _this.platformId = platformId;
        // render options
        _this.showFirst = true;
        _this.showLast = false;
        _this.showPrevious = true;
        _this.showNext = true;
        _this.pagesPadding = 3;
        _this.state = {
            createURL: noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: noop
        };
        return _this;
    }
    Object.defineProperty(NgAisPagination.prototype, "pages", {
        get: function () {
            var _a = this.state, nbPages = _a.nbPages, currentRefinement = _a.currentRefinement;
            var pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
            var pagesPadding = typeof this.pagesPadding === "string"
                ? parseInt(this.pagesPadding, 10)
                : this.pagesPadding;
            if (pagesPadding && pagesPadding > 0) {
                // should not display pages that does not exists
                if (nbPages < pagesPadding * 2 + 1) {
                    return pagesArray;
                }
                var minDelta = currentRefinement - pagesPadding - 1;
                var maxDelta = currentRefinement + pagesPadding + 1;
                if (minDelta < 0) {
                    return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
                }
                if (maxDelta > nbPages) {
                    return range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
                }
                return range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
            }
            return pagesArray;
        },
        enumerable: true,
        configurable: true
    });
    NgAisPagination.prototype.ngOnInit = function () {
        this.createWidget(connectPagination, {
            maxPages: parseNumberInput(this.maxPages)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisPagination.prototype.refine = function (event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page <= this.state.nbPages && page >= 0) {
            this.state.refine(page);
        }
    };
    NgAisPagination.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-pagination",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngIf=\"showFirst\"\n            (click)=\"refine($event, 0)\"\n            [class]=\"\n              cx('item', 'firstPage') +\n              (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(0)\"\n              [class]=\"cx('link')\"\n            >\n              \u00AB\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showPrevious\"\n            (click)=\"refine($event, state.currentRefinement - 1)\"\n            [class]=\"\n              cx('item', 'previousPage') +\n              (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.currentRefinement - 1)\"\n              [class]=\"cx('link')\"\n            >\n              \u2039\n            </a>\n          </li>\n\n          <li\n            [class]=\"\n              cx('item', 'page') +\n              (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n            \"\n            *ngFor=\"let page of pages\"\n            (click)=\"refine($event, page)\"\n          >\n            <a\n              [class]=\"cx('link')\"\n              [href]=\"state.createURL(page)\"\n            >\n              {{page + 1}}\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showNext\"\n            (click)=\"refine($event, state.currentRefinement + 1)\"\n            [class]=\"\n              cx('item', 'nextPage') +\n              (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.currentRefinement + 1)\"\n              [class]=\"cx('link')\"\n            >\n              \u203A\n            </a>\n          </li>\n\n          <li\n            *ngIf=\"showLast\"\n            (click)=\"refine($event, state.nbPages)\"\n            [class]=\"\n              cx('item', 'lastPage') +\n              (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n            \"\n          >\n            <a\n              [href]=\"state.createURL(state.nbPages)\"\n              [class]=\"cx('link')\"\n            >\n              \u00BB\n            </a>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisPagination.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisPagination.propDecorators = {
        'showFirst': [{ type: Input },],
        'showLast': [{ type: Input },],
        'showPrevious': [{ type: Input },],
        'showNext': [{ type: Input },],
        'pagesPadding': [{ type: Input },],
        'maxPages': [{ type: Input },],
    };
    return NgAisPagination;
}(BaseWidget));

var NgAisPaginationModule = /** @class */ (function () {
    function NgAisPaginationModule() {
    }
    NgAisPaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisPagination],
                    entryComponents: [NgAisPagination],
                    exports: [NgAisPagination],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisPaginationModule.ctorParameters = function () { return []; };
    return NgAisPaginationModule;
}());

var __extends$12 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisRangeSlider = /** @class */ (function (_super) {
    __extends$12(NgAisRangeSlider, _super);
    function NgAisRangeSlider(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RangeSlider") || this;
        _this.platformId = platformId;
        // render options
        _this.pips = true;
        _this.tooltips = true;
        _this.precision = 2;
        _this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1]
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                // create slider
                var config = {
                    animate: false,
                    behaviour: "snap",
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: _this.step,
                    tooltips: _this.tooltips && [
                        { to: _this.formatTooltip },
                        { to: _this.formatTooltip }
                    ]
                };
                if (_this.pips === true || typeof _this.pips === "undefined") {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: "positions",
                            stepped: true,
                            values: [0, 50, 100]
                        }
                    });
                }
                else if (isPlainObject(_this.pips)) {
                    Object.assign(config, { pips: _this.pips });
                }
                _this.slider = create(_this.sliderContainer.nativeElement, config);
                // register listen events
                _this.sliderContainer.nativeElement.noUiSlider.on("change", _this.handleChange);
            }
            // update component inner state
            _this.state = state;
            // update the slider state
            var _a = state.range, min = _a.min, max = _a.max, start = state.start;
            var disabled = min === max;
            var range$$1 = disabled ? { min: min, max: max + 0.0001 } : { min: min, max: max };
            _this.slider.updateOptions({ disabled: disabled, range: range$$1, start: start });
        };
        _this.handleChange = function (values) {
            _this.state.refine(values);
        };
        _this.formatTooltip = function (value) {
            return value.toFixed(parseNumberInput(_this.precision));
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeSlider.prototype, "step", {
        get: function () {
            // compute step from the precision value
            return 1 / Math.pow(10, parseNumberInput(this.precision));
        },
        enumerable: true,
        configurable: true
    });
    NgAisRangeSlider.prototype.ngOnInit = function () {
        this.createWidget(connectRange, {
            attributeName: this.attributeName,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRangeSlider.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-range-slider",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRangeSlider.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRangeSlider.propDecorators = {
        'sliderContainer': [{ type: ViewChild, args: ["sliderContainer",] },],
        'pips': [{ type: Input },],
        'tooltips': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'precision': [{ type: Input },],
    };
    return NgAisRangeSlider;
}(BaseWidget));

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

var __extends$13 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisRefinementList = /** @class */ (function (_super) {
    __extends$13(NgAisRefinementList, _super);
    function NgAisRefinementList(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RefinementList") || this;
        _this.platformId = platformId;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.searchPlaceholder = "Search here...";
        _this.operator = "or";
        _this.limitMin = 10;
        // inner state
        _this.searchQuery = "";
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false
        };
        return _this;
    }
    Object.defineProperty(NgAisRefinementList.prototype, "items", {
        get: function () {
            return isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisRefinementList.prototype.ngOnInit = function () {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limitMin),
            showMoreLimit: parseNumberInput(this.limitMax),
            attributeName: this.attributeName,
            sortBy: this.sortBy,
            escapeFacetValues: true
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRefinementList.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    NgAisRefinementList.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.searchForItems(this.searchQuery);
    };
    NgAisRefinementList.prototype.handleChange = function (value) {
        this.searchQuery = value;
        this.state.searchForItems(value);
    };
    NgAisRefinementList.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-refinement-list",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <form\n          [class]=\"cx('form')\"\n          *ngIf=\"withSearchBox\"\n          (submit)=\"handleSubmit($event)\"\n          novalidate\n        >\n          <input\n            [class]=\"cx('input')\"\n            autocapitalize=\"off\"\n            autocorrect=\"off\"\n            placeholder=\"{{searchPlaceholder}}\"\n            role=\"textbox\"\n            spellcheck=\"false\"\n            type=\"text\"\n            [value]=\"searchQuery\"\n            (input)=\"handleChange($event.target.value)\"\n          />\n        </form>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item') + (item.isRefined ? cx('item', 'selected') : '')\"\n            *ngFor=\"let item of items\"\n            (click)=\"refine($event, item)\"\n          >\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('checkbox')\"\n                type=\"checkbox\"\n                value=\"{{item.value}}\"\n                [checked]=\"item.isRefined\"\n              />\n              <ng-ais-highlight\n                attributeName=\"highlighted\"\n                [hit]=\"item\"\n              >\n              </ng-ais-highlight>\n              <span [class]=\"cx('count')\">\n                {{item.count}}\n              </span>\n            </label>\n          </li>\n        </ul>\n\n        <button\n          *ngIf=\"state.canToggleShowMore\"\n          (click)=\"state.toggleShowMore()\"\n        >\n          {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n        </button>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementList.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRefinementList.propDecorators = {
        'showMoreLabel': [{ type: Input },],
        'showLessLabel': [{ type: Input },],
        'transformItems': [{ type: Input },],
        'withSearchBox': [{ type: Input },],
        'searchPlaceholder': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'operator': [{ type: Input },],
        'limitMin': [{ type: Input },],
        'limitMax': [{ type: Input },],
        'sortBy': [{ type: Input },],
    };
    return NgAisRefinementList;
}(BaseWidget));

var NgAisRefinementListModule = /** @class */ (function () {
    function NgAisRefinementListModule() {
    }
    NgAisRefinementListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRefinementList],
                    entryComponents: [NgAisRefinementList],
                    exports: [NgAisRefinementList],
                    imports: [
                        CommonModule,
                        NgAisHeaderModule,
                        NgAisFooterModule,
                        NgAisHighlightModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgAisRefinementListModule.ctorParameters = function () { return []; };
    return NgAisRefinementListModule;
}());

var __extends$14 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisSearchBox = /** @class */ (function (_super) {
    __extends$14(NgAisSearchBox, _super);
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

var NgAisSearchBoxModule = /** @class */ (function () {
    function NgAisSearchBoxModule() {
    }
    NgAisSearchBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSearchBox],
                    entryComponents: [NgAisSearchBox],
                    exports: [NgAisSearchBox],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisSearchBoxModule.ctorParameters = function () { return []; };
    return NgAisSearchBoxModule;
}());

var __extends$15 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisSortBy = /** @class */ (function (_super) {
    __extends$15(NgAisSortBy, _super);
    function NgAisSortBy(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "SortBy") || this;
        _this.platformId = platformId;
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop
        };
        return _this;
    }
    NgAisSortBy.prototype.ngOnInit = function () {
        this.createWidget(connectSortBySelector, { indices: this.indices });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisSortBy.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-sort-by",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <select\n          [class]=\"cx('select')\"\n          (change)=\"state.refine($event.target.value)\"\n        >\n          <option\n            [class]=\"cx('option')\"\n            *ngFor=\"let item of state.options\"\n            [value]=\"item.value\"\n            [selected]=\"item.value === state.currentRefinement\"\n          >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisSortBy.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisSortBy.propDecorators = {
        'indices': [{ type: Input },],
    };
    return NgAisSortBy;
}(BaseWidget));

var NgAisSortByModule = /** @class */ (function () {
    function NgAisSortByModule() {
    }
    NgAisSortByModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSortBy],
                    entryComponents: [NgAisSortBy],
                    exports: [NgAisSortBy],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisSortByModule.ctorParameters = function () { return []; };
    return NgAisSortByModule;
}());

var __extends$16 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisRatingMenu = /** @class */ (function (_super) {
    __extends$16(NgAisRatingMenu, _super);
    function NgAisRatingMenu(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "RatingMenu") || this;
        _this.platformId = platformId;
        // render options
        _this.andUpLabel = "& Up";
        _this.max = 5;
        _this.state = {
            createURL: noop,
            hasNoResults: false,
            items: [],
            refine: noop
        };
        return _this;
    }
    NgAisRatingMenu.prototype.ngOnInit = function () {
        this.createWidget(connectStarRating, {
            attributeName: this.attributeName,
            max: this.max
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRatingMenu.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-rating-menu",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <svg style=\"display:none;\">\n          <symbol\n            id=\"ais-StarRating-starSymbol\"\n            viewBox=\"0 0 24 24\"\n            width=\"24\"\n            height=\"24\"\n          >\n            <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n          </symbol>\n          <symbol\n            id=\"ais-StarRating-starEmptySymbol\"\n            viewBox=\"0 0 24 24\"\n            width=\"24\"\n            height=\"24\"\n          >\n            <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n          </symbol>\n        </svg>\n\n        <ul [class]=\"cx('list')\">\n          <li\n            *ngFor=\"let item of state.items\"\n            [class]=\"cx('item') + (item.isRefined ? cx('item', 'selected') : '')\"\n          >\n            <button\n              [class]=\"cx('button')\"\n              [attr.aria-label]=\"item.name + ' stars & up'\"\n            >\n              <svg\n                *ngFor=\"let star of item.stars\"\n                [ngClass]=\"cx('starIcon')\"\n                aria-hidden=\"true\"\n              >\n                <use\n                  *ngIf=\"star\"\n                  xlink:href=\"#ais-StarRating-starSymbol\"\n                >\n                </use>\n\n                <use\n                  *ngIf=\"!star\"\n                  xlink:href=\"#ais-StarRating-starEmptySymbol\"\n                >\n                </use>\n              </svg>\n\n              <span [class]=\"cx('label')\" aria-hidden=\"true\">\n                {{andUpLabel}}\n              </span>\n\n              <span [class]=\"cx('count')\">\n                {{item.count}}\n              </span>\n            </button>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisRatingMenu.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisRatingMenu.propDecorators = {
        'andUpLabel': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'max': [{ type: Input },],
    };
    return NgAisRatingMenu;
}(BaseWidget));

var NgAisRatingMenuModule = /** @class */ (function () {
    function NgAisRatingMenuModule() {
    }
    NgAisRatingMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRatingMenu],
                    entryComponents: [NgAisRatingMenu],
                    exports: [NgAisRatingMenu],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisRatingMenuModule.ctorParameters = function () { return []; };
    return NgAisRatingMenuModule;
}());

var __extends$17 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisStats = /** @class */ (function (_super) {
    __extends$17(NgAisStats, _super);
    function NgAisStats(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Stats") || this;
        _this.platformId = platformId;
        _this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: ""
        };
        _this.createWidget(connectStats);
        return _this;
    }
    Object.defineProperty(NgAisStats.prototype, "templateContext", {
        get: function () {
            return { state: this.state };
        },
        enumerable: true,
        configurable: true
    });
    NgAisStats.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-stats",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <ng-container\n        [ngClass]=\"cx('body')\"\n        *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <div\n        [class]=\"cx('body')\"\n        *ngIf=\"!template\"\n      >\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisStats.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisStats.propDecorators = {
        'template': [{ type: ContentChild, args: [TemplateRef,] },],
    };
    return NgAisStats;
}(BaseWidget));

var NgAisStatsModule = /** @class */ (function () {
    function NgAisStatsModule() {
    }
    NgAisStatsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisStats],
                    entryComponents: [NgAisStats],
                    exports: [NgAisStats],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisStatsModule.ctorParameters = function () { return []; };
    return NgAisStatsModule;
}());

var __extends$18 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisToggle = /** @class */ (function (_super) {
    __extends$18(NgAisToggle, _super);
    function NgAisToggle(platformId, searchInstance) {
        var _this = _super.call(this, searchInstance, "Toggle") || this;
        _this.platformId = platformId;
        _this.values = { on: true, off: undefined };
        _this.state = {
            createURL: noop,
            refine: noop,
            value: {}
        };
        return _this;
    }
    NgAisToggle.prototype.ngOnInit = function () {
        this.createWidget(connectToggle, {
            attributeName: this.attributeName,
            label: this.label,
            values: this.values
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisToggle.prototype.handleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    };
    NgAisToggle.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-toggle",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            (click)=\"handleClick($event)\">\n            <label [class]=\"cx('label')\">\n              <input\n                [class]=\"cx('checkbox')\"\n                type=\"checkbox\"\n                value=\"{{state.value.name}}\"\n                [checked]=\"state.value.isRefined\"\n              />\n              {{label || state.value.name}}\n              <span [class]=\"cx('count')\">\n                {{state.value.count}}\n              </span>\n            </label>\n          </li>\n        </ul>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisToggle.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NgAisInstance, },
    ]; };
    NgAisToggle.propDecorators = {
        'attributeName': [{ type: Input },],
        'label': [{ type: Input },],
        'values': [{ type: Input },],
    };
    return NgAisToggle;
}(BaseWidget));

var NgAisToggleModule = /** @class */ (function () {
    function NgAisToggleModule() {
    }
    NgAisToggleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisToggle],
                    entryComponents: [NgAisToggle],
                    exports: [NgAisToggle],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisToggleModule.ctorParameters = function () { return []; };
    return NgAisToggleModule;
}());

var __extends$19 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NgAisNumericRange = /** @class */ (function (_super) {
    __extends$19(NgAisNumericRange, _super);
    function NgAisNumericRange(searchInstance) {
        var _this = _super.call(this, searchInstance, "RangeSlider") || this;
        // render options
        _this.currency = "$";
        _this.separator = "to";
        _this.submitLabel = "Go";
        _this.precision = 2;
        // inner state
        _this.minInputValue = "";
        _this.maxInputValue = "";
        _this.state = {
            range: { min: undefined, max: undefined },
            refine: noop,
            start: [0, 0]
        };
        return _this;
    }
    Object.defineProperty(NgAisNumericRange.prototype, "step", {
        get: function () {
            return 1 / Math.pow(10, parseNumberInput(this.precision));
        },
        enumerable: true,
        configurable: true
    });
    NgAisNumericRange.prototype.ngOnInit = function () {
        this.createWidget(connectRange, {
            attributeName: this.attributeName,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericRange.prototype.handleChange = function (event, type) {
        var value = parseNumberInput(event.target.value);
        if (type === "min") {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    };
    NgAisNumericRange.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    };
    NgAisNumericRange.decorators = [
        { type: Component, args: [{
                    selector: "ng-ais-numeric-range",
                    template: "\n    <div [class]=\"cx()\">\n      <ng-ais-header [header]=\"header\" [className]=\"cx('header')\"></ng-ais-header>\n\n      <div [class]=\"cx('body')\">\n        <form\n          [class]=\"cx('form')\"\n          (submit)=\"handleSubmit($event)\"\n          novalidate\n        >\n          <label [class]=\"cx('label')\">\n            <span [class]=\"cx('currency')\">{{currency}} </span>\n            <input\n              [class]=\"cx('input')\"\n              type=\"number\"\n              [min]=\"state.range.min\"\n              [max]=\"state.range.max\"\n              [placeholder]=\"state.range.min\"\n              [value]=\"minInputValue\"\n              [step]=\"step\"\n              (change)=\"handleChange($event, 'min')\"\n            />\n          </label>\n\n          <span [class]=\"cx('separator')\"> {{separator}} </span>\n\n          <label [class]=\"cx('label')\">\n            <span [class]=\"cx('currency')\">{{currency}} </span>\n            <input\n              [class]=\"cx('input')\"\n              type=\"number\"\n              [min]=\"state.range.min\"\n              [max]=\"state.range.max\"\n              [placeholder]=\"state.range.max\"\n              [value]=\"maxInputValue\"\n              [step]=\"step\"\n              (change)=\"handleChange($event, 'max')\"\n            />\n          </label>\n\n          <button\n            [class]=\"cx('submit')\"\n            (click)=\"handleSubmit($event)\"\n          >\n            {{submitLabel}}\n          </button>\n        </form>\n      </div>\n\n      <ng-ais-footer [footer]=\"footer\" [className]=\"cx('footer')\"></ng-ais-footer>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgAisNumericRange.ctorParameters = function () { return [
        { type: NgAisInstance, },
    ]; };
    NgAisNumericRange.propDecorators = {
        'currency': [{ type: Input },],
        'separator': [{ type: Input },],
        'submitLabel': [{ type: Input },],
        'attributeName': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'precision': [{ type: Input },],
    };
    return NgAisNumericRange;
}(BaseWidget));

var NgAisNumericRangeModule = /** @class */ (function () {
    function NgAisNumericRangeModule() {
    }
    NgAisNumericRangeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericRange],
                    entryComponents: [NgAisNumericRange],
                    exports: [NgAisNumericRange],
                    imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
                },] },
    ];
    /** @nocollapse */
    NgAisNumericRangeModule.ctorParameters = function () { return []; };
    return NgAisNumericRangeModule;
}());

// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
var algoliasearch = algoliasearchProxy__default || algoliasearchProxy;
var encode = encodeProxy__default || encodeProxy;
function createSSRAlgoliaClient(_a) {
    var httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    return function (_, appId, apiKey) {
        var client = algoliasearch(appId, apiKey, {});
        client.addAlgoliaAgent("angular-instantsearch " + VERSION);
        client._request = function (rawUrl, opts) {
            var headers = new HttpHeaders();
            headers = headers.set("content-type", opts.method === "POST"
                ? "application/x-www-form-urlencoded"
                : "application/json");
            headers = headers.set("accept", "application/json");
            var url = rawUrl + (rawUrl.includes("?") ? "&" : "?") + encode(opts.headers);
            var transferStateKey = makeStateKey("ngais(" + opts.body + ")");
            if (transferState.hasKey(transferStateKey)) {
                var resp = JSON.parse(transferState.get(transferStateKey, {}));
                return Promise.resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers
                });
            }
            return new Promise(function (resolve, reject) {
                httpClient
                    .request(opts.method, url, {
                    headers: headers,
                    body: opts.body,
                    observe: "response"
                })
                    .subscribe(function (resp) {
                    transferState.set(transferStateKey, JSON.stringify(resp));
                    resolve({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                }, function (resp) {
                    return reject({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                });
            });
        };
        return client;
    };
}

// Transforms url query to SearchParameters
function parseServerRequest(req) {
    if (req && req.url && req.url.includes("?")) {
        var query = req.url.split("?")[1];
        return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}

// Modules
// Custom SSR algoliasearchClient
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

export { createSSRAlgoliaClient, parseServerRequest, NgAisRootModule, NgAisModule };
//# sourceMappingURL=angular-instantsearch.esm.js.map

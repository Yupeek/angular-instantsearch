import { OnDestroy, OnInit } from "@angular/core";
import { NgAisInstance } from "./instantsearch/instantsearch-instance";
export declare class Widget {
    init: () => void;
    getConfiguration: () => object;
    render: (params: {
        templatesConfig: object;
        state: object;
        results: {}[];
        createURL: (value: any) => string;
        instantSearchInstance: object;
    }) => void;
    dispose: (params: {
        helper: object;
        state: object;
    }) => object | void;
}
export declare type Connector = (renderFn: (state: object, isFirstRendering: boolean) => void, unmountFn: () => void) => (widgetOptions?: object) => Widget;
export declare class BaseWidget implements OnInit, OnDestroy {
    private searchInstance;
    plateformId: Object;
    header?: string;
    footer?: string;
    widget?: Widget;
    state?: object;
    cx?: Function;
    constructor(searchInstance: NgAisInstance, widgetName: string);
    createWidget(connector: Connector, options?: object): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateState: (state: {}, isFirstRendering: boolean) => void | Promise<void>;
}

import { Widget } from "../base-widget";
export declare type InstantSearchConfig = {
    appId: string;
    apiKey: string;
    indexName: string;
    numberLocale?: string;
    searchFunction?: () => void;
    createAlgoliaClient?: (algoliasearch: Function, appId: string, apiKey: string) => object;
    searchParameters?: object | void;
    urlSync?: boolean | {
        mapping?: object;
        threshold?: number;
        trackedParameters?: string[];
        useHash?: boolean;
        getHistoryState?: () => object;
    };
};
export declare class InstantSearchInstance {
    start: () => void;
    addWidget: (widget: Widget) => void;
    addWidgets: (widgets: Widget[]) => void;
    removeWidget: (widget: Widget) => void;
    removeWidgets: (widgets: Widget[]) => void;
    on: (eventName: string, callback: Function) => void;
    removeListener: (eventName: string, callback: Function) => void;
    helper: {
        lastResults: Object;
        state: Object;
    };
}
export declare class NgAisInstance {
    private platformId;
    private instance?;
    private didSSR;
    constructor(platformId: Object);
    init(config: InstantSearchConfig): void;
    start(): void;
    addWidget(widget: Widget): void;
    addWidgets(widgets: Widget[]): void;
    removeWidget(widget: Widget): void;
    removeWidgets(widgets: Widget[]): void;
    on(eventName: string, callback: Function): void;
    off(eventName: string, callback: Function): void;
    getResults(): Object;
    getState(): Object;
}

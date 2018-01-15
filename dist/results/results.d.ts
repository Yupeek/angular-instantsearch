import { TemplateRef } from "@angular/core";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisResults extends BaseWidget {
    plateformId: Object;
    template?: TemplateRef<any>;
    transformItems?: Function;
    state: {
        hits: {}[];
        results: {};
    };
    constructor(plateformId: Object, searchInstance: NgAisInstance);
    updateState: (state: {
        hits: {}[];
        results: {};
    }, isFirstRendering: boolean) => void;
}

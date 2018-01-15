import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisStats extends BaseWidget {
    platformId: Object;
    template: any;
    state: {
        hitPerPage: number;
        nbHits: number;
        nbPages: number;
        page: number;
        processingTimeMS: number;
        query: string;
    };
    readonly templateContext: {
        state: {
            hitPerPage: number;
            nbHits: number;
            nbPages: number;
            page: number;
            processingTimeMS: number;
            query: string;
        };
    };
    constructor(platformId: Object, searchInstance: NgAisInstance);
}

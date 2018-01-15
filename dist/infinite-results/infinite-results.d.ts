import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisInfiniteResults extends BaseWidget {
    platformId: Object;
    template?: any;
    showMoreLabel: string;
    transformItems?: Function;
    state: {
        hits: {}[];
        isLastPage: boolean;
        showMore: Function;
        results: {};
    };
    constructor(platformId: Object, searchInstance: NgAisInstance);
    showMore(event: MouseEvent): void;
    updateState: (state: {
        hits: {}[];
        results: {};
        isLastPage: boolean;
        showMore: Function;
    }, isFirstRendering: boolean) => void;
}

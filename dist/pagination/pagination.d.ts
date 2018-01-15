import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisPagination extends BaseWidget {
    platformId: Object;
    showFirst: boolean;
    showLast: boolean;
    showPrevious: boolean;
    showNext: boolean;
    pagesPadding: number | string;
    maxPages?: number | string;
    state: {
        createURL: (...args: any[]) => void;
        currentRefinement: number;
        nbHits: number;
        nbPages: number;
        refine: (...args: any[]) => void;
    };
    readonly pages: any;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    refine(event: MouseEvent, page: number): void;
}

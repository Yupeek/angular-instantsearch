import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisClearRefinements extends BaseWidget {
    platformId: Object;
    buttonLabel: string;
    clearsQuery: boolean;
    excludeAttributes: string[];
    state: {
        hasRefinements: boolean;
        refine: (...args: any[]) => void;
    };
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleClick(event: MouseEvent): void;
}

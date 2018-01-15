import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisSortBy extends BaseWidget {
    platformId: Object;
    indices: {
        name: string;
        label: string;
    }[];
    state: {
        currentRefinement?: string;
        options: {}[];
        refine: Function;
    };
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
}

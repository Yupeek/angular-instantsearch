import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type NumericSelectorState = {
    currentRefinement?: string;
    options: {}[];
    refine: Function;
};
export declare class NgAisNumericSelector extends BaseWidget {
    platformId: Object;
    attributeName: string;
    operator: "<" | "<=" | "=" | ">=" | ">" | "!=";
    options: {
        value: number;
        label: string;
    }[];
    state: NumericSelectorState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
}

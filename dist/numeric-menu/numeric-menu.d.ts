import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type NumericRefinementListState = {
    createURL: Function;
    items: {}[];
    refine: Function;
};
export declare class NgAisNumericMenu extends BaseWidget {
    platformId: Object;
    attributeName: string;
    options: {
        name: string;
        start?: number;
        end?: number;
    }[];
    state: NumericRefinementListState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    refine(event: MouseEvent, item: {
        value: string;
    }): void;
}

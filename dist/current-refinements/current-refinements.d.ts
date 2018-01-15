import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type CurrentRefinementsState = {
    attributes: {};
    clearAllClick: Function;
    clearAllURL: Function;
    createURL: Function;
    refine: Function;
    refinements: {}[];
};
export declare class NgAisCurrentRefinements extends BaseWidget {
    platformId: Object;
    clearRefinements: "before" | "after" | boolean;
    clearRefinementsLabel: string;
    transformItems?: Function;
    onlyListedAttributes: boolean;
    clearsQuery: boolean;
    attributes: {
        name: string;
        label: string;
    }[];
    state: CurrentRefinementsState;
    readonly refinements: any;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleClick(event: MouseEvent, refinement: {}): void;
    handleClearAllClick(event: MouseEvent): void;
}

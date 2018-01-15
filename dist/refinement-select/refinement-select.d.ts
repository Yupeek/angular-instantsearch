import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type RefinementSelectState = {
    canRefine: boolean;
    canToggleShowMore: boolean;
    createURL: Function;
    isShowingMore: boolean;
    items: {}[];
    refine: Function;
    toggleShowMore: Function;
    searchForItems: Function;
    isFormSearch: boolean;
};
export declare class NgAisRefinementSelect extends BaseWidget {
    platformId: Object;
    showMoreLabel: string;
    showLessLabel: string;
    transformItems?: Function;
    withSearchBox?: boolean;
    searchPlaceholder: string;
    attributeName: string;
    operator: "or" | "and";
    limitMin: number | string;
    limitMax: number | string;
    sortBy: string[] | ((item: object) => number);
    searchQuery: string;
    state: RefinementSelectState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    readonly items: any;
    ngOnInit(): void;
    refine(event: MouseEvent, item: {
        isRefined: boolean;
        value: string;
    }): void;
    handleSubmit(event: MouseEvent): void;
    handleChange(value: string): void;
}

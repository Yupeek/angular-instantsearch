import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type MenuState = {
    canRefine: boolean;
    canToggleShowMore: boolean;
    createURL: Function;
    isShowingMore: boolean;
    items: {}[];
    refine: Function;
    toggleShowMore: Function;
};
export declare class NgAisMenu extends BaseWidget {
    platformId: Object;
    showMoreLabel: string;
    showLessLabel: string;
    transformItems?: Function;
    attributeName: string;
    limitMin?: number | string;
    limitMax?: number | string;
    sortBy?: string[] | ((item: object) => number);
    state: MenuState;
    readonly items: any;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleClick(event: MouseEvent, value: string): void;
}

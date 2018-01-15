import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type HierarchicalMenuState = {
    createURL: Function;
    items: {}[];
    refine: Function;
};
export declare class NgAisHierarchicalMenu extends BaseWidget {
    platformId: Object;
    transformItems?: Function;
    attributes: string[];
    separator?: string;
    rootPath?: string;
    showParentLevel?: boolean;
    limit?: number | string;
    sortBy?: string[] | ((item: object) => number);
    state: HierarchicalMenuState;
    readonly items: any;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
}

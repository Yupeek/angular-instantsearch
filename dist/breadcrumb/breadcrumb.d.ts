import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type BreadcrumbState = {
    createURL: Function;
    items: BreadcrumbItem[];
    refine: Function;
};
export declare type BreadcrumbItem = {
    name: string;
    value: string;
};
export declare class NgAisBreadcrumb extends BaseWidget {
    platformId: Object;
    attributes: string[];
    rootPath?: string;
    readonly itemsWithSeparator: ({} | {
        separator: boolean;
    })[];
    state: BreadcrumbState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleClick(event: MouseEvent, item: BreadcrumbItem): void;
}

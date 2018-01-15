import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type ToggleState = {
    createURL: Function;
    refine: Function;
    value: {
        name?: string;
        count?: number;
        isRefined?: boolean;
    };
};
export declare class NgAisToggle extends BaseWidget {
    platformId: Object;
    attributeName: string;
    label: string;
    values: {
        on?: boolean;
        off?: boolean;
    };
    state: ToggleState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleClick(event: MouseEvent): void;
}

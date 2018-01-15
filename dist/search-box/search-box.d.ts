import { EventEmitter } from "@angular/core";
import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare class NgAisSearchBox extends BaseWidget {
    platformId: Object;
    placeholder: string;
    submitTitle: string;
    resetTitle: string;
    searchAsYouType: boolean;
    submit: EventEmitter<{}>;
    reset: EventEmitter<{}>;
    change: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    state: {
        query: string;
        refine: (...args: any[]) => void;
    };
    constructor(platformId: Object, searchInstance: NgAisInstance);
    handleChange(query: string): void;
    handleSubmit(event: MouseEvent): void;
    handleReset(event: MouseEvent): void;
}

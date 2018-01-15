import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type NumericRangeState = {
    range: {
        min?: number;
        max?: number;
    };
    refine: Function;
    start: number[];
};
export declare class NgAisNumericRange extends BaseWidget {
    currency: string;
    separator: string;
    submitLabel: string;
    attributeName: string;
    min?: number | string;
    max?: number | string;
    precision?: number | string;
    minInputValue: number | string;
    maxInputValue: number | string;
    readonly step: number;
    state: NumericRangeState;
    constructor(searchInstance: NgAisInstance);
    ngOnInit(): void;
    handleChange(event: any, type: string): void;
    handleSubmit(event: MouseEvent | KeyboardEvent): void;
}

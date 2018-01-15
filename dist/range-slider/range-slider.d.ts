import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type RangeSliderState = {
    range: {
        min: number;
        max: number;
    };
    refine: Function;
    start: number[];
};
export declare class NgAisRangeSlider extends BaseWidget {
    platformId: Object;
    sliderContainer: any;
    pips: boolean;
    tooltips: boolean;
    attributeName: string;
    min?: number | string;
    max?: number | string;
    precision?: number | string;
    state: RangeSliderState;
    private slider;
    readonly step: number;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
    updateState: (state: RangeSliderState, isFirstRendering: boolean) => void;
    handleChange: (values: string[] | number[]) => void;
    formatTooltip: (value: number) => string;
}

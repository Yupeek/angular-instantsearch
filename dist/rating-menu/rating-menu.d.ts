import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type RatingMenuState = {
    createURL: Function;
    hasNoResults: boolean;
    items: {}[];
    refine: Function;
};
export declare class NgAisRatingMenu extends BaseWidget {
    platformId: Object;
    andUpLabel: string;
    attributeName: string;
    max?: number;
    state: RatingMenuState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
}

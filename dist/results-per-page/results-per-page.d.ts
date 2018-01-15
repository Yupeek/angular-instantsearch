import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
export declare type ResultsPerPageState = {
    items: {}[];
    refine: Function;
};
export declare class NgAisResultsPerPage extends BaseWidget {
    platformId: Object;
    items: {
        value: number;
        label: string;
        default?: boolean;
    }[];
    state: ResultsPerPageState;
    constructor(platformId: Object, searchInstance: NgAisInstance);
    ngOnInit(): void;
}

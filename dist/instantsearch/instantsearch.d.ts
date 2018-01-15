import { AfterViewInit, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { NgAisInstance, InstantSearchConfig } from "./instantsearch-instance";
export declare class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
    private searchInstance;
    config: InstantSearchConfig;
    change: EventEmitter<{
        results: {};
        state: {};
    }>;
    constructor(searchInstance: NgAisInstance);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onInstantSearchRender: () => void;
}

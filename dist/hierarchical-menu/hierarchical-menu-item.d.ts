export declare type HierarchicalMenuItem = {
    value: string;
    label: string;
    count: number;
    isRefined: boolean;
    data: HierarchicalMenuItem[];
};
export declare class NgAisHierarchicalMenuItem {
    lvl: number;
    refine: (string) => void;
    createURL: (string) => string;
    item: HierarchicalMenuItem;
    cx: (element?: string, subElement?: string) => string;
    isArray(potentialArray: any): boolean;
    handleClick(event: MouseEvent, item: HierarchicalMenuItem): void;
}

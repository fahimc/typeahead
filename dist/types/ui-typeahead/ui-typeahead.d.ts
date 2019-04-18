export interface TypeAHeadItem {
    label: string;
    id: string | number;
}
export interface TypeAHeadOptions {
    menuHeight: string;
}
export declare class TypeAHeadComponent extends HTMLElement {
    static readonly observedAttributes: string[];
    static EVENTS: {
        ON_CHANGE: string;
    };
    private optionList;
    private selectedList;
    private options;
    private element;
    private styleElement;
    constructor();
    setList(value: any): void;
    setSelected(value: any): void;
    setOptions(value: any): void;
    private setProp;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private render;
    private onPillClick;
    private onClearAllSelected;
    private onInputKey;
    private dispatchOnChange;
    private onParentfocus;
    private getMenuItems;
    private onMenuItemClicked;
    private getPillTemplate;
    private getPillList;
    private getTemplate;
}

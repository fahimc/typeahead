import { TypeAHeadItem } from "../../src/typeahead";

export class TypeAHeadItemBuilder {
    private item: TypeAHeadItem;
    constructor(){
        this.item = {
            id: String(Date.now()),
            label: 'item',
        }
    }
    public build(): TypeAHeadItem{
        return this.item;
    }
}
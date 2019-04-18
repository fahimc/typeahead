import {TypeAHeadItem} from '../../src/typeahead';
import { TypeAHeadItemBuilder } from './typeahead-item-builder';
export interface TypeAHeadPropBuilderProps {
    optionList:TypeAHeadItem[],
    selectedList:TypeAHeadItem[],
}
export class TypeAHeadPropBuilder {
    private props: TypeAHeadPropBuilderProps;
    constructor(){
        const selectedItem = new TypeAHeadItemBuilder().build();
        this.props = {
            optionList: [
                selectedItem,
                new TypeAHeadItemBuilder().build(),
                new TypeAHeadItemBuilder().build(),
            ],
            selectedList: [
                selectedItem,
            ]
        }
    }
    public build() : TypeAHeadPropBuilderProps{
        return this.props;
    }
}
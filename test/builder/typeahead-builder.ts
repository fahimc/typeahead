import { TypeAHeadComponent } from "../../src/typeahead";

export class TypeAHeadBuilder {
    private element: HTMLElement;
    constructor(){
        this.element = new TypeAHeadComponent();
    }
    public build() : HTMLElement{
        document.body.appendChild(this.element);
        return this.element;
    }
}
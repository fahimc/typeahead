import {TypeAHeadStyle} from './style/typeahead';
export interface TypeAHeadItem {
    label:string;
    id: string | number;
} 
export interface TypeAHeadOptions {
    menuHeight:string;
}
export class TypeAHeadComponent extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['option-list' ,'selected-list', 'options'];
    }
    public static EVENTS = {
        ON_CHANGE: 'TYPEAHEAD_ON_CHANGE',
    }
    private optionList: TypeAHeadItem[];
    private selectedList: TypeAHeadItem[];
    private options: TypeAHeadOptions;
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    constructor() {
        super();
        this.optionList = [];
        this.selectedList = [];
        this.options = {
            menuHeight: '200px',
        }
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
    }
    public setList(value: any ){
        this.setProp('optionList',value);
    }
    public setSelected(value: any ){
       this.setProp('selectedList',value);
    }
    public setOptions(value: any ){
        this.setProp('options',value);
     }
    private setProp(prop:string, value:any){
        if(!value) return;
        (this as any)[prop] = (typeof value == 'string') ?  JSON.parse(value): value;
        this.render();
    }
    public connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = TypeAHeadStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render(true);
        this.element.addEventListener('click',this.onParentfocus.bind(this) as EventListenerOrEventListenerObject)
    }
    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'option-list':
                this.setList(newValue);
            break;
            case 'selected-list':
                this.setSelected(newValue);
            break;
            case 'options':
                this.setOptions(newValue);
            break;
        }
    }

    private render(isFirstTime?:boolean){
        if(!isFirstTime) this.dispatchOnChange();
        this.element.innerHTML = this.getTemplate();
        const closeButton = this.element.querySelector('.close') as HTMLElement;
        if(this.selectedList.length){
            closeButton.classList.add('show');
        }else{
            closeButton.classList.remove('show');
        }
        const input = this.element.querySelector('input') as HTMLElement;
        input.addEventListener('keyup',this.onInputKey.bind(this));
        input.addEventListener('click',this.onInputKey.bind(this) as EventListenerOrEventListenerObject);
        closeButton.addEventListener('click',this.onClearAllSelected.bind(this));
        this.element.querySelectorAll('.pill span').forEach((closeButton)=>closeButton.addEventListener('click',this.onPillClick.bind(this) as EventListenerOrEventListenerObject));
    }
    private onPillClick(event : MouseEvent){
        const index = (event.currentTarget as HTMLElement).getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    }
    private onClearAllSelected() {
        this.selectedList = [];
        this.render();
    }
    private onInputKey(event: KeyboardEvent){
        const customEvent = new CustomEvent('OPEN_MENU',{
            detail:{
                items: this.getMenuItems(),
                relativeElement: this,
                options: {
                    height: this.options && this.options.menuHeight ? this.options.menuHeight : '',
                }
            }
        })
        document.body.dispatchEvent(customEvent);
    }
    private dispatchOnChange(){
        const customEvent = new CustomEvent(TypeAHeadComponent.EVENTS.ON_CHANGE,{
            detail:{
                selectedItems: [...this.selectedList],
            }
        })
        this.dispatchEvent(customEvent);
    }
    
    private onParentfocus(event: FocusEvent){
        (this.element.querySelector('input') as HTMLElement).focus();
    }
    private getMenuItems(): any[]{
        const value =  (this.element.querySelector('input') as HTMLInputElement).value.toLowerCase();
        let options = !value ? this.optionList
        .filter(item=> !this.selectedList.find(sItem => item.id == sItem.id))
        : this.optionList.filter(item=> !this.selectedList.find(sItem => item.id == sItem.id) && item.label.toLowerCase().indexOf(value) >= 0 )
        .map(item => {return {...item, label: item.label.replace(new RegExp(`${value}`,'igm'),`<strong>${value}</strong>`)}});
        if(!options.length)options.push({
            label: 'No matches found.',
            id: 0,
        })
        return options.map(item => {return {...item, callback:this.onMenuItemClicked.bind(this)}});
    }
    private onMenuItemClicked(selectedItem: TypeAHeadItem){
        this.selectedList.push(this.optionList.find(item => item.id == selectedItem.id) as TypeAHeadItem);
        this.render();
        (this.element.querySelector('input') as HTMLElement).focus();
    }
    private  getPillTemplate(name: string, index:number){
        return `
            <div class="pill">
                ${name}
                <span pill-id="${index}">x</span>
            </div>
        `;
    }
    private getPillList(){
        let template = ``;
        this.selectedList.forEach((item, index)=>{
            template += this.getPillTemplate(item.label, index);
        });
        return template;
    }
    private getTemplate() {
        return `
            ${this.getPillList()}
            <input>
            <span class="close">x</span>
        `;
    }
}
customElements.define('ui-typeahead', TypeAHeadComponent);
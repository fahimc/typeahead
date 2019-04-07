import {JSDOM} from 'jsdom';
(global as any).window = new JSDOM().window;
(global as any).document = window.document;
(global as any).HTMLElement = (window as any).HTMLElement;
(global as any).customElements = {
  define(name:any,c:any){
    document.querySelectorAll('name').forEach((node)=>{
      new c(node);
    });
  }
};
//import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
//import '@webcomponents/webcomponentsjs/webcomponents-bundle';

import "../src/ui-typeahead/ui-typeahead";
/**
 * TypeAhead Test
 */
describe("View", () => {
  let typeahead;
  beforeEach(()=>{
    typeahead = document.createElement('ui-typeahead');
    document.body.appendChild(typeahead)
  });
  it("document to contain typeahead", () => {
    expect(document.querySelector('ui-typeahead')).toBeTruthy();
  });
})

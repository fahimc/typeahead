import "../src/typeahead";
import {TypeAHeadBuilder} from './builder/typeahead-builder';
import { TypeAHeadPropBuilder } from "./builder/typeahead-prop-builder";
/**
 * TypeAhead Test
 */
describe("TypeAHead Test", () => {
  let typeahead: HTMLElement;
  describe("View", () => {
    beforeEach(()=>{
      typeahead = new TypeAHeadBuilder().build();
    });
    it("typeahead element extends HTMLElement", () => {
      expect(typeahead instanceof HTMLElement).toBeTruthy();
    });
    it("document to contain typeahead", () => {
      expect(document.querySelector('ui-typeahead')).toBeTruthy();
    });
  });

  describe("Behaviour", () => {
    describe("set option list", () => {
      beforeEach(()=>{
        typeahead = new TypeAHeadBuilder().build();
        const props = new TypeAHeadPropBuilder().build();
        typeahead.setAttribute('option-list', JSON.stringify(props.optionList));
      });
      it("document to contain option list attribute", () => {
        expect(document.querySelector('ui-typeahead[option-list]')).toBeTruthy();
      });  
    });
    describe("set selected list", () => {
      beforeEach(()=>{
        typeahead = new TypeAHeadBuilder().build();
        const props = new TypeAHeadPropBuilder().build();
        typeahead.setAttribute('option-list', JSON.stringify(props.optionList));
        typeahead.setAttribute('selected-list', JSON.stringify(props.selectedList));
      });
      it("document to contain selected list attribute", () => {
        expect(document.querySelector('ui-typeahead[selected-list]')).toBeTruthy();
      });
      it("pills should be created from selected list", () => {
        console.log(document.querySelector('ui-typeahead'));
        // expect((typeahead.shadowRoot).querySelector('.pill')).toBeTruthy();
      });  
    });
  });
});

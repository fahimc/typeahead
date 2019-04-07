"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeahead_1 = require("./style/typeahead");
var TypeAHead = /** @class */ (function (_super) {
    __extends(TypeAHead, _super);
    function TypeAHead() {
        var _this = _super.call(this) || this;
        _this.optionList = [];
        _this.selectedList = [];
        _this.options = {
            menuHeight: '200px',
        };
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        return _this;
    }
    Object.defineProperty(TypeAHead, "observedAttributes", {
        get: function () {
            return ['option-list', 'selected-list', 'options'];
        },
        enumerable: true,
        configurable: true
    });
    TypeAHead.prototype.setList = function (value) {
        this.setProp('optionList', value);
    };
    TypeAHead.prototype.setSelected = function (value) {
        this.setProp('selectedList', value);
    };
    TypeAHead.prototype.setOptions = function (value) {
        this.setProp('options', value);
    };
    TypeAHead.prototype.setProp = function (prop, value) {
        if (!value)
            return;
        this[prop] = (typeof value == 'string') ? JSON.parse(value) : value;
        this.render();
    };
    TypeAHead.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = typeahead_1.TypeAHeadStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render(true);
        this.element.addEventListener('click', this.onParentfocus.bind(this));
    };
    TypeAHead.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
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
    };
    TypeAHead.prototype.render = function (isFirstTime) {
        var _this = this;
        if (!isFirstTime)
            this.dispatchOnChange();
        this.element.innerHTML = this.getTemplate();
        var closeButton = this.element.querySelector('.close');
        if (this.selectedList.length) {
            closeButton.classList.add('show');
        }
        else {
            closeButton.classList.remove('show');
        }
        var input = this.element.querySelector('input');
        input.addEventListener('keyup', this.onInputKey.bind(this));
        input.addEventListener('click', this.onInputKey.bind(this));
        closeButton.addEventListener('click', this.onClearAllSelected.bind(this));
        this.element.querySelectorAll('.pill span').forEach(function (closeButton) { return closeButton.addEventListener('click', _this.onPillClick.bind(_this)); });
    };
    TypeAHead.prototype.onPillClick = function (event) {
        var index = event.currentTarget.getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    };
    TypeAHead.prototype.onClearAllSelected = function () {
        this.selectedList = [];
        this.render();
    };
    TypeAHead.prototype.onInputKey = function (event) {
        var customEvent = new CustomEvent('OPEN_MENU', {
            detail: {
                items: this.getMenuItems(),
                relativeElement: this,
                options: {
                    height: this.options && this.options.menuHeight ? this.options.menuHeight : '',
                }
            }
        });
        document.body.dispatchEvent(customEvent);
    };
    TypeAHead.prototype.dispatchOnChange = function () {
        var customEvent = new CustomEvent(TypeAHead.EVENTS.ON_CHANGE, {
            detail: {
                selectedItems: this.selectedList.slice(),
            }
        });
        this.dispatchEvent(customEvent);
    };
    TypeAHead.prototype.onParentfocus = function (event) {
        this.element.querySelector('input').focus();
    };
    TypeAHead.prototype.getMenuItems = function () {
        var _this = this;
        var value = this.element.querySelector('input').value.toLowerCase();
        var options = !value ? this.optionList
            .filter(function (item) { return !_this.selectedList.find(function (sItem) { return item.id == sItem.id; }); })
            : this.optionList.filter(function (item) { return !_this.selectedList.find(function (sItem) { return item.id == sItem.id; }) && item.label.toLowerCase().indexOf(value) >= 0; })
                .map(function (item) { return __assign({}, item, { label: item.label.replace(new RegExp("" + value, 'igm'), "<strong>" + value + "</strong>") }); });
        if (!options.length)
            options.push({
                label: 'No matches found.',
                id: 0,
            });
        return options.map(function (item) { return __assign({}, item, { callback: _this.onMenuItemClicked.bind(_this) }); });
    };
    TypeAHead.prototype.onMenuItemClicked = function (selectedItem) {
        this.selectedList.push(this.optionList.find(function (item) { return item.id == selectedItem.id; }));
        this.render();
        this.element.querySelector('input').focus();
    };
    TypeAHead.prototype.getPillTemplate = function (name, index) {
        return "\n            <div class=\"pill\">\n                " + name + "\n                <span pill-id=\"" + index + "\">x</span>\n            </div>\n        ";
    };
    TypeAHead.prototype.getPillList = function () {
        var _this = this;
        var template = "";
        this.selectedList.forEach(function (item, index) {
            template += _this.getPillTemplate(item.label, index);
        });
        return template;
    };
    TypeAHead.prototype.getTemplate = function () {
        return "\n            " + this.getPillList() + "\n            <input>\n            <span class=\"close\">x</span>\n        ";
    };
    TypeAHead.EVENTS = {
        ON_CHANGE: 'TYPEAHEAD_ON_CHANGE',
    };
    return TypeAHead;
}(HTMLElement));
customElements.define('ui-typeahead', TypeAHead);
//# sourceMappingURL=ui-typeahead.js.map
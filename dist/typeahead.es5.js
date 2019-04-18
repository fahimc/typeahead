/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        this.optionList = [];
        this.state = {
            isShowing: false,
            mouseX: 0,
            mouseY: 0,
        };
        this.options = {
            height: '100px',
        };
        this.relativeElement = null;
        this.resizeHandler = this.onResize.bind(this);
        this.openMenuHandler = this.openMenu.bind(this);
        this.menuClickedHandler = this.onMenuClicked.bind(this);
        this.mouseClickHandler = this.onMouseClick.bind(this);
        this.mouseMoveHandler = this.onMouseMove.bind(this);
        document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
    }
    MenuComponent.prototype.onDomLoaded = function () {
        this.createMenu();
    };
    MenuComponent.prototype.createMenu = function () {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (!menu) {
            var styleElement = document.createElement('style');
            menu = document.createElement('div');
            menu.id = MenuComponent.MENU_ID;
            styleElement.innerHTML = this.getStyle();
            menu.innerHTML = this.getTemplate();
            document.body.appendChild(styleElement);
            document.body.appendChild(menu);
        }
        document.body.addEventListener(MenuComponent.EVENTS.OPEN_MENU, this.openMenuHandler);
        document.body.addEventListener('click', this.mouseClickHandler);
        document.body.addEventListener('mousemove', this.mouseMoveHandler);
    };
    MenuComponent.prototype.onMouseMove = function (event) {
        if (event.pageX) {
            this.state.mouseX = event.pageX;
            this.state.mouseY = event.pageY;
        }
        else {
            this.state.mouseX = window.event.x + document.body.scrollLeft - 2;
            this.state.mouseY = window.event.y + document.body.scrollTop - 2;
        }
    };
    MenuComponent.prototype.onMouseClick = function (event) {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (menu && this.relativeElement && this.isMouseOutOfElement(menu) && this.isMouseOutOfElement(this.relativeElement) || menu && !this.relativeElement && this.isMouseOutOfElement(menu)) {
            this.hideMenu();
        }
    };
    MenuComponent.prototype.isMouseOutOfElement = function (element) {
        var rect = element.getBoundingClientRect();
        var offsetY = element.offsetTop;
        var offsetX = element.offsetLeft;
        return this.state.mouseX > (rect.width + offsetX) || this.state.mouseX < (offsetX) || this.state.mouseY > (rect.height + offsetY) || this.state.mouseY < (offsetY);
    };
    MenuComponent.prototype.openMenu = function (event) {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        var detail = event.detail;
        this.options = {
            height: '',
        };
        if (menu && detail.items) {
            if (this.optionList !== detail.items) {
                this.optionList = detail.items;
                this.options = detail.options;
                this.relativeElement = detail.relativeElement;
                var listHolder = menu.querySelector('.ui-list-holder');
                if (listHolder)
                    listHolder.innerHTML = this.getMenuList();
            }
            if (!menu.classList.contains('show')) {
                this.state.isShowing = true;
                menu.style.height = this.options && this.options.height ? this.options.height : '';
                menu.classList.add('show');
                var listHolder = menu.querySelector('.ui-list-holder');
                if (listHolder)
                    listHolder.addEventListener('click', this.menuClickedHandler);
                window.addEventListener('resize', this.resizeHandler);
            }
            this.positionMenu();
        }
    };
    MenuComponent.prototype.onMenuClicked = function (event) {
        var id = event.srcElement ? event.srcElement.getAttribute('option-list-id') : null;
        var item = this.optionList.find(function (option) { return option.id == id; });
        if (item) {
            if (item.callback)
                item.callback(item);
        }
        this.hideMenu();
    };
    MenuComponent.prototype.hideMenu = function () {
        window.removeEventListener('resize', this.resizeHandler);
        this.reset();
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (menu) {
            var listHolder = menu.querySelector('.ui-list-holder');
            if (listHolder)
                listHolder.removeEventListener('click', this.menuClickedHandler);
            menu.classList.remove('show');
        }
    };
    MenuComponent.prototype.reset = function () {
        this.state.isShowing = false;
        this.relativeElement = null;
        this.optionList = [];
    };
    MenuComponent.prototype.positionMenu = function () {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (menu && this.relativeElement) {
            var rect = this.relativeElement.getBoundingClientRect();
            var viewPortHeight = window.innerHeight;
            menu.style.width = rect.width + 'px';
            var menuRect = menu.getBoundingClientRect();
            menu.style.left = this.relativeElement.offsetLeft + 'px';
            if (rect.bottom + menuRect.height > viewPortHeight) {
                menu.style.top = (this.relativeElement.offsetTop - menuRect.height) + 'px';
            }
            else {
                menu.style.top = (this.relativeElement.offsetTop + rect.height) + 'px';
            }
        }
        else if (menu) {
            menu.style.top = this.state.mouseY + 'px';
            menu.style.left = this.state.mouseX + 'px';
        }
    };
    MenuComponent.prototype.onResize = function () {
        if (this.state.isShowing) {
            this.positionMenu();
        }
    };
    MenuComponent.prototype.getStyle = function () {
        return "\n            #" + MenuComponent.MENU_ID + " {\n                font-family: Helvetica, Arial, sans-serif;\n                font-family: var(--ui-menu-font-family, Helvetica, Arial, sans-serif);\n                position:absolute;\n                padding: 10px;\n                padding: var(--ui-menu-padding, 10px);\n                border: 1px solid #333;\n                display:none;\n                box-sizing: border-box;\n                background-color:white;\n                background-color:var(--ui-menu-bg-color, white);\n                z-index:99999;\n                overflow:auto;\n            }\n            #" + MenuComponent.MENU_ID + ".show {\n                display:block;\n            }\n            #" + MenuComponent.MENU_ID + " .ui-list-holder div {\n                cursor: pointer;\n            }\n            #" + MenuComponent.MENU_ID + " .ui-list-holder div:hover {\n                background-color: #ccc;\n            }\n\n            ";
    };
    MenuComponent.prototype.getMenuList = function () {
        var template = "";
        this.optionList
            .forEach(function (item, index) {
            template += "\n            <div option-list-id=\"" + (item.id !== undefined ? item.id : index) + "\">\n                " + item.label + "\n            </div>\n            ";
        });
        return template;
    };
    MenuComponent.prototype.getTemplate = function () {
        return "\n            <div class=\"ui-list-holder\">\n            <div>\n        ";
    };
    MenuComponent.MENU_ID = 'ui-menu';
    MenuComponent.EVENTS = {
        OPEN_MENU: 'OPEN_MENU'
    };
    return MenuComponent;
}());
window.UIComponents = __assign({}, window.UIComponents, { menuComponent: new MenuComponent() });

var TypeAHeadStyle = function () {
    var margin = '5px';
    return "\n            ui-typeahead {\n                display:inline-block;\n                font-family: Helvetica, Arial, sans-serif;\n            }\n            :host {\n                display:inline-block;\n                font-family: Helvetica, Arial, sans-serif;\n            }\n            .wrapper {\n                display: flex;\n                border:1px solid #333;\n                flex-wrap: wrap;\n                position: relative;\n                padding-right: 1.5rem;\n                background-color: white;\n                background-color: var(--typeahead-bg-color,white);\n            }\n            .pill {\n                border-radius: 0.2rem;\n                border-radius: var(--pill-border-radius,0.2rem);\n                background-color: #999;\n                background-color: var(--pill-bg-color,#999);\n                color: white;\n                color: var(--pill-color,white);\n                padding: 0.3rem 0.5rem;\n                padding: var(--pill-padding,0.3rem 0.5rem);\n                margin-top: 0.2rem;\n                margin-top: var(--pill-margin-top,0.2rem);\n                margin-bottom: 0.2rem;\n                margin-bottom: var(--pill-margin-bottom,0.2rem);\n                margin-left: 0.2rem;\n                margin-left: var(--pill-margin-left,0.2rem);\n                display: inline-block;\n                margin-right: 0.2rem;\n                margin-right: var(--pill-margin-right,0.2rem);\n                font-size: 0.75rem;\n                font-size: var(--pill-font-size,0.75rem);\n                cursor:pointer;\n            }\n            .pill:not(.active):hover {\n                background-color: #666;\n                background-color: var(--pill-hover-bg-color,#666);\n            }\n            .pill.active {\n                background-color: #333;\n                background-color: var(--pill-active-bg-color,#333);\n                color: white;\n                color: var(--pill-active-color,white);\n            }\n            .pill span {\n                display: inline-block;\n                padding: 0 0.2rem;\n            }\n            input {\n                display: inline-block;\n                flex: 1;\n                border: none;\n                min-width:2rem;\n                margin:" + margin + ";\n            }\n            input:focus {\n                outline:none;\n            }\n            span.close {\n                position: absolute;\n                right: 0.5rem;\n                top: 50%;\n                transform: translateY(-50%);\n                font-size: 0.8rem;\n                font-weight: 700;\n                line-height: 1;\n                color: #333;\n                color: var(--typeahead-close-color,#333);\n                cursor: pointer;\n                display: none;\n            }\n            span.close:hover {\n                color: #999;\n                color: var(--typeahead-close-color,#999);\n            }\n            span.close.show {\n                display: block;\n            }\n            ";
};

var TypeAHeadComponent = /** @class */ (function (_super) {
    __extends(TypeAHeadComponent, _super);
    function TypeAHeadComponent() {
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
    Object.defineProperty(TypeAHeadComponent, "observedAttributes", {
        get: function () {
            return ['option-list', 'selected-list', 'options'];
        },
        enumerable: true,
        configurable: true
    });
    TypeAHeadComponent.prototype.setList = function (value) {
        this.setProp('optionList', value);
    };
    TypeAHeadComponent.prototype.setSelected = function (value) {
        this.setProp('selectedList', value);
    };
    TypeAHeadComponent.prototype.setOptions = function (value) {
        this.setProp('options', value);
    };
    TypeAHeadComponent.prototype.setProp = function (prop, value) {
        if (!value)
            return;
        this[prop] = (typeof value == 'string') ? JSON.parse(value) : value;
        this.render();
    };
    TypeAHeadComponent.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = TypeAHeadStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render(true);
        this.element.addEventListener('click', this.onParentfocus.bind(this));
    };
    TypeAHeadComponent.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
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
    TypeAHeadComponent.prototype.render = function (isFirstTime) {
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
    TypeAHeadComponent.prototype.onPillClick = function (event) {
        var index = event.currentTarget.getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    };
    TypeAHeadComponent.prototype.onClearAllSelected = function () {
        this.selectedList = [];
        this.render();
    };
    TypeAHeadComponent.prototype.onInputKey = function (event) {
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
    TypeAHeadComponent.prototype.dispatchOnChange = function () {
        var customEvent = new CustomEvent(TypeAHeadComponent.EVENTS.ON_CHANGE, {
            detail: {
                selectedItems: this.selectedList.slice(),
            }
        });
        this.dispatchEvent(customEvent);
    };
    TypeAHeadComponent.prototype.onParentfocus = function (event) {
        this.element.querySelector('input').focus();
    };
    TypeAHeadComponent.prototype.getMenuItems = function () {
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
    TypeAHeadComponent.prototype.onMenuItemClicked = function (selectedItem) {
        this.selectedList.push(this.optionList.find(function (item) { return item.id == selectedItem.id; }));
        this.render();
        this.element.querySelector('input').focus();
    };
    TypeAHeadComponent.prototype.getPillTemplate = function (name, index) {
        return "\n            <div class=\"pill\">\n                " + name + "\n                <span pill-id=\"" + index + "\">x</span>\n            </div>\n        ";
    };
    TypeAHeadComponent.prototype.getPillList = function () {
        var _this = this;
        var template = "";
        this.selectedList.forEach(function (item, index) {
            template += _this.getPillTemplate(item.label, index);
        });
        return template;
    };
    TypeAHeadComponent.prototype.getTemplate = function () {
        return "\n            " + this.getPillList() + "\n            <input>\n            <span class=\"close\">x</span>\n        ";
    };
    TypeAHeadComponent.EVENTS = {
        ON_CHANGE: 'TYPEAHEAD_ON_CHANGE',
    };
    return TypeAHeadComponent;
}(HTMLElement));
customElements.define('ui-typeahead', TypeAHeadComponent);

export { TypeAHeadComponent };
//# sourceMappingURL=typeahead.es5.js.map

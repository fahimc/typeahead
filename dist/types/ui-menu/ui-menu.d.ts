interface MenuItem {
    id: string;
    label: string;
    callback: Function;
}
interface MenuEventDetail {
    items: MenuItem[];
    relativeElement: HTMLElement;
    options: MenuOptions;
}
interface MenuStateInterface {
    isShowing: boolean;
    mouseX: number;
    mouseY: number;
}
interface MenuOptions {
    height: string;
}
declare class MenuComponent {
    static MENU_ID: string;
    static EVENTS: {
        OPEN_MENU: string;
    };
    private options;
    private optionList;
    private relativeElement;
    private state;
    private resizeHandler;
    private openMenuHandler;
    private menuClickedHandler;
    private mouseClickHandler;
    private mouseMoveHandler;
    constructor();
    private onDomLoaded;
    private createMenu;
    private onMouseMove;
    private onMouseClick;
    private isMouseOutOfElement;
    private openMenu;
    private onMenuClicked;
    private hideMenu;
    private reset;
    private positionMenu;
    private onResize;
    private getStyle;
    private getMenuList;
    private getTemplate;
}

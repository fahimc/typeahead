export const TypeAHeadStyle = ()=>{
    const margin = '5px';
        return `
            ui-typeahead {
                display:inline-block;
                font-family: Helvetica, Arial, sans-serif;
            }
            :host {
                display:inline-block;
                font-family: Helvetica, Arial, sans-serif;
            }
            .wrapper {
                display: flex;
                border:1px solid #333;
                flex-wrap: wrap;
                position: relative;
                padding-right: 1.5rem;
                background-color: white;
                background-color: var(--typeahead-bg-color,white);
            }
            .pill {
                border-radius: 0.2rem;
                border-radius: var(--pill-border-radius,0.2rem);
                background-color: #999;
                background-color: var(--pill-bg-color,#999);
                color: white;
                color: var(--pill-color,white);
                padding: 0.3rem 0.5rem;
                padding: var(--pill-padding,0.3rem 0.5rem);
                margin-top: 0.2rem;
                margin-top: var(--pill-margin-top,0.2rem);
                margin-bottom: 0.2rem;
                margin-bottom: var(--pill-margin-bottom,0.2rem);
                margin-left: 0.2rem;
                margin-left: var(--pill-margin-left,0.2rem);
                display: inline-block;
                margin-right: 0.2rem;
                margin-right: var(--pill-margin-right,0.2rem);
                font-size: 0.75rem;
                font-size: var(--pill-font-size,0.75rem);
                cursor:pointer;
            }
            .pill:not(.active):hover {
                background-color: #666;
                background-color: var(--pill-hover-bg-color,#666);
            }
            .pill.active {
                background-color: #333;
                background-color: var(--pill-active-bg-color,#333);
                color: white;
                color: var(--pill-active-color,white);
            }
            .pill span {
                display: inline-block;
                padding: 0 0.2rem;
            }
            input {
                display: inline-block;
                flex: 1;
                border: none;
                min-width:2rem;
                margin:${margin};
            }
            input:focus {
                outline:none;
            }
            span.close {
                position: absolute;
                right: 0.5rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.8rem;
                font-weight: 700;
                line-height: 1;
                color: #333;
                color: var(--typeahead-close-color,#333);
                cursor: pointer;
                display: none;
            }
            span.close:hover {
                color: #999;
                color: var(--typeahead-close-color,#999);
            }
            span.close.show {
                display: block;
            }
            `;
}
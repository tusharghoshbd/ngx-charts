import { ElementRef, Renderer2 } from '@angular/core';
export declare class TooltipDirective {
    private el;
    private renderer;
    tooltipTitle: string;
    placement: string;
    delay: number;
    tooltip: HTMLElement;
    offset: number;
    constructor(el: ElementRef, renderer: Renderer2);
    onMouseEnter(): void;
    onMouseLeave(): void;
    show(): void;
    hide(): void;
    create(): void;
    setPosition(): void;
}

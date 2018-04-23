import { ElementRef, Renderer2 } from '@angular/core';
export declare class SplitGutterDirective {
    private elRef;
    private renderer;
    order: number;
    private _direction;
    direction: 'vertical' | 'horizontal';
    useTransition: boolean;
    private _size;
    size: number;
    private _color;
    color: string;
    private _imageH;
    imageH: string;
    private _imageV;
    imageV: string;
    private _disabled;
    disabled: boolean;
    constructor(elRef: ElementRef, renderer: Renderer2);
    private refreshStyle();
    private getCursor(state);
    private getImage(state);
}

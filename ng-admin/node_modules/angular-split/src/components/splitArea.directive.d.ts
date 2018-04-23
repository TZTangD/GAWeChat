import { ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { SplitComponent } from './split.component';
export declare class SplitAreaDirective implements OnInit, OnDestroy {
    private elRef;
    private renderer;
    private split;
    private _order;
    order: number | null;
    private _size;
    size: number | null;
    private _minSize;
    minSize: number;
    private _visible;
    visible: boolean;
    private transitionListener;
    private readonly lockListeners;
    constructor(elRef: ElementRef, renderer: Renderer2, split: SplitComponent);
    ngOnInit(): void;
    getSizePixel(prop: 'offsetWidth' | 'offsetHeight'): number;
    setStyleVisibleAndDir(isVisible: boolean, isDragging: boolean, direction: 'horizontal' | 'vertical'): void;
    setStyleOrder(value: number): void;
    setStyleFlexbasis(value: string, isDragging: boolean): void;
    private setStyleTransition(useTransition);
    private onTransitionEnd(event);
    lockEvents(): void;
    unlockEvents(): void;
    ngOnDestroy(): void;
}

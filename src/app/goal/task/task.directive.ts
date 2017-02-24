import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[task]'
})
export class TaskDirective {
    @HostBinding()

    @HostListener('mouseenter') onMouseEnter() {
        this.mouseOn = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.mouseOn = false;
    }

    mouseOn = false;
    constructor() {}

}

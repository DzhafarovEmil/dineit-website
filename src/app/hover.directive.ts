import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostBinding('class.hovered') isHovered = false;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.getElementsByClassName('fixed-action-btn').item(0).style.display = 'inline-block';
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.getElementsByClassName('fixed-action-btn').item(0).style.display = 'none';
    this.isHovered = false;
  }
}

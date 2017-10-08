import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[onReturn]'
})
export class OnReturnDirective {
  private el: ElementRef;
  @Input() onReturn: string;

  constructor(private _el: ElementRef) {
    this.el = this._el;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const inputs =
        Array.prototype.slice.call(document.querySelectorAll("input"));
      const index =
        (inputs.indexOf(document.activeElement) + 1) % inputs.length;
      const input = inputs[index];
      input.focus();
      input.select();
    }
  }
}

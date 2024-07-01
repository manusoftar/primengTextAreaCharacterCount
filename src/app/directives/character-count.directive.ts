import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { InputTextarea } from 'primeng/inputtextarea';

@Directive({
  selector: '[appCharacterCount]'
})
export class CharacterCountDirective extends InputTextarea implements OnInit {
  maxLength: number;
  showCounter = false;
  counter: HTMLElement;
  wrapper: HTMLElement;

  constructor(el: ElementRef, ngModel: NgModel, control: NgControl, cd: ChangeDetectorRef, private renderer: Renderer2) {
    super(el, ngModel, control, cd);
    this.maxLength = el.nativeElement.maxLength;
  }

  ngOnInit(): void {
    if (this.maxLength < 0) {
      return;
    }
    this.counter = this.renderer.createElement('span');
    this.renderer.addClass(this.counter, 'text-area-char-counter');

    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'text-area-counter-wrapper');

    const parent = this.el.nativeElement.parentNode;
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.counter);
    this.renderer.appendChild(parent, this.wrapper);
  }

  onFocus(e: any): void {
    super.onFocus(e)
    this.showCounter = true;
    this.setCounterContent();
  }

  onBlur(e: any): void {
    super.onBlur(e);
    this.showCounter = false;
    this.setCounterContent();
  }

  updateState(): void {
    super.updateState();
    this.setCounterContent();
  }

  setCounterContent() {
    if (this.maxLength > 0) {
      this.counter.innerHTML = this.showCounter ? this.el.nativeElement.value.length + '/' + this.maxLength : '';
    }
  }
}

import { ChangeDetectorRef, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
    // Create the container and put it after the textarea
    this.counter = this.renderer.createElement('span');
    this.renderer.addClass(this.counter, 'text-area-char-counter');

    // Insert the container after the textarea without wrapping it
    const parent = this.el.nativeElement.parentNode;
    this.renderer.insertBefore(
      parent,
      this.counter,
      this.el.nativeElement.nextSibling
    );
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

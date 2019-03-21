import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[three-obj]'
})
export class ThreeAnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

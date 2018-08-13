import { Component, Input } from '@angular/core';

/**
 * Generated class for the EmptyListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'empty-list',
  templateUrl: 'empty-list.html'
})
export class EmptyListComponent {
  @Input() text:string;
  constructor() {
    
  }

}

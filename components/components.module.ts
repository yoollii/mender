import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListItemComponent } from './list-item/list-item';
import { EmptyListComponent } from './empty-list/empty-list';
@NgModule({
	declarations: [ListItemComponent,
    EmptyListComponent],
	imports: [IonicModule],
	exports: [ListItemComponent,
    EmptyListComponent]
})
export class ComponentsModule {}

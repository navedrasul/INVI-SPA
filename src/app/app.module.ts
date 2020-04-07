import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { BodyComponent } from './components/layout/body/body.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ItemListComponent } from './components/containers/item-list/item-list.component';
import { ItemRowComponent } from './components/containers/item-list/item-row/item-row.component';
import { AddEditItemComponent } from './components/shared/add-edit-item/add-edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ItemListComponent,
    ItemRowComponent,
    AddEditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(faLib: FaIconLibrary) {
  //   faLib.addIcons(
  //     faCoffee
  //   );
  // }
}

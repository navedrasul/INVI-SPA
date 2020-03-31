import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { BodyComponent } from './components/layout/body/body.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ItemListComponent } from './components/containers/item-list/item-list.component';
import { ItemRowComponent } from './components/containers/item-list/item-row/item-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ItemListComponent,
    ItemRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
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

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
import { DataStorageService } from './services/data-storage.service';
import { AppEventsService } from './services/app-events.service';
import { AppStateService } from './services/app-state.service';
import { HomeComponent } from './home/home.component';
import { InvoiceExportComponent } from './invoice-export/invoice-export.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ItemListComponent,
    ItemRowComponent,
    AddEditItemComponent,
    HomeComponent,
    InvoiceExportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    DataStorageService,
    AppEventsService,
    AppStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

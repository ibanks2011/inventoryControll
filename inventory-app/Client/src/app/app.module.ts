import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatNativeDateModule} from '@angular/material/core';
import { MatListModule } from '@angular/material/list';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StatusComponent } from './status/status.component';

import { ManufactureViewComponent } from './manufacturer/view/manufactureView.component';
import { InventoryViewComponent } from './inventory/view/inventoryView.component';
import { CatalogViewComponent } from './catalog/view/catalogView.component';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { InventoryModule } from './inventory/inventory.module';
import { CatalogModule } from './catalog/catalog.module';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    StatusComponent,   
    InventoryViewComponent,
    CatalogViewComponent,
    ManufactureViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatNativeDateModule,
    MatListModule,
    InventoryModule,
    CatalogModule,
    ManufacturerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

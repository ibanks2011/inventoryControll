import { Component, ViewChild } from '@angular/core';
import { CatalogFormComponent } from '../components/forms/catalogForm/catalogForm.component';
import { CatalogTableComponent } from '../components/catalogTable/catalogTable.component';
import { catalogFormWithManState } from '../components/forms/catalogFormWithManState/catalogFormWithManState';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalogView.component.html',
  styleUrls: ['./catalogView.component.css']
})
export class CatalogViewComponent {
  @ViewChild(CatalogTableComponent) catalogTableComponent: CatalogTableComponent;
  @ViewChild(CatalogFormComponent) CatalogFormComponent : CatalogFormComponent;
  @ViewChild(catalogFormWithManState) catalogFormWithManState : catalogFormWithManState;

  formState = 0;

  toggleForm(state: number): void {
    this.formState = this.formState === state ? 0 : state;
  }
  onCatalogAdded() {
    console.log('emmit went through onItemAdded() called in InventoryViewComponent'); 
    this.catalogTableComponent.loadData();
  }
}

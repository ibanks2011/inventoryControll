import { Component, ViewChild } from '@angular/core';
import { ManufacturerFormComponent } from '../components/manufacturerForm/manufacturerForm.component';
import { ManufacturerTableComponent } from '../components/manufacturerTable/manufacturerTable.component';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufactureView.component.html',
  styleUrls: ['./manufactureView.component.css']
})
export class ManufactureViewComponent {
  formState = 0;

  @ViewChild(ManufacturerTableComponent) manufacturerTableComponent: ManufacturerTableComponent;
  @ViewChild(ManufacturerFormComponent) ManufacturerFormComponent : ManufacturerFormComponent;


  toggleForm(state: number): void {
    this.formState = this.formState === state ? 0 : state;
  }
  onManufacturerAdded() {
    this.manufacturerTableComponent.loadData();
  }
}

import { Component, ViewChild } from "@angular/core";
import { InventoryFormComponent } from "../components/forms/inventoryForm/inventoryForm.component";
import { InventoryTableComponent } from "../components/inventoryTable/inventoryTable.component";
@Component({
  selector: 'app-inventory',
  templateUrl: './inventoryView.component.html',
  styleUrls: ['./inventoryView.component.css']
})
export class InventoryViewComponent {
  @ViewChild(InventoryTableComponent) inventoryTableComponent: InventoryTableComponent;
  @ViewChild(InventoryFormComponent) InventoryFormComponent : InventoryFormComponent;

  formState = 0;

  toggleForm(state: number): void {
    this.formState = this.formState === state ? 0 : state;
  }
  onCat

  onItemAdded() {
    console.log('emmit went through onItemAdded() called in InventoryViewComponent'); 
    this.inventoryTableComponent.loadData();
  }

}

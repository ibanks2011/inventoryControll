import { Component,Output,EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { InventoryService } from '../../../services/inventory.service';


@Component({
    selector: 'inventory-form',
    templateUrl: './inventoryForm.component.html',
    styleUrls: ['./inventoryForm.component.css']
})
export class InventoryFormComponent {
  @Output() itemAdded = new EventEmitter<void>();

    constructor(private inventoryService: InventoryService){}
    

    inventoryForm = new FormGroup({
        inventoryItemId: new FormControl(null),
        catalogId: new FormControl(null),
        color: new FormControl(''),
        numberOfWheels: new FormControl(null),
        serialNumber: new FormControl(null),
    });


    addInventory() {      

        const catalogId = this.inventoryForm.get('catalogId').value;
        const color = this.inventoryForm.get('color').value;
        const numberOfWheels = this.inventoryForm.get('numberOfWheels').value;
        const serialNumber = this.inventoryForm.get('serialNumber').value;
        let inventoryItemId: any;
        
       const inventory = { inventoryItemId, catalogId, color, numberOfWheels, serialNumber };
        
      this.inventoryService.addInventoryItem(inventory).subscribe((data) => {
        if(data){
          this.itemAdded.emit();
        }else{
          console.log('there was a problem adding inventory')
        }        
    })
  }
    
}



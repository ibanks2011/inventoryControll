import { Component,Output,EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from 'src/app/catalog/services/catalog.service';
import { InventoryService } from '../../../services/inventory.service';


@Component({
    selector: 'inventory-form-with-catalog',
    templateUrl: './inventoryFormWithCatalog.component.html',
    styleUrls: ['./inventoryFormWithCatalog.component.css']
})
export class InventoryFormWithCatalogComponent {
  @Output() itemAdded = new EventEmitter<void>();
  catalogs: any

    constructor(private inventoryService: InventoryService, private catalogService: CatalogService){
      this.catalogService.getData().subscribe((data) => {
        this.catalogs = data;
      })
    }
    

    inventoryForm = new FormGroup({
        catalog: new FormControl(null),
        color: new FormControl(''),
        numberOfWheels: new FormControl(null),
        serialNumber: new FormControl(null),
    });


    addInventory() {      

        const catalogId = this.inventoryForm.get('catalog').value;
        const color = this.inventoryForm.get('color').value;
        const numberOfWheels = this.inventoryForm.get('numberOfWheels').value;
        const serialNumber = this.inventoryForm.get('serialNumber').value;
        let inventoryItemId: any;
        
       const inventory = { inventoryItemId, catalogId, color, numberOfWheels, serialNumber };
      
        
      this.inventoryService.addInventoryItem(inventory).subscribe((data) => {
        if(data){
          this.itemAdded.emit();
          this.inventoryForm.reset();
        }else{
          console.log('there was a problem adding item ')
        }        
      })         
    }
    
}



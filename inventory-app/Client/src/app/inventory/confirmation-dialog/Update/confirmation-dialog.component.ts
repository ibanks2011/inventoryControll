import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationUpdateDialogComponent {
  @Output() itemUpdated= new EventEmitter<void>();
  inventoryItem: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private inventoryService: InventoryService,
  ) {}
 

  inventoryForm = new FormGroup({
      inventoryItemId: new FormControl(null),
      catalogId: new FormControl(null),
      color: new FormControl(''),
      numberOfWheels: new FormControl(null),
      serialNumber: new FormControl(null),
  });


  updateInventory() {      

      const inventoryItemId = this.dialogRef.id
      const catalogId = this.inventoryForm.get('catalogId').value;
      const color = this.inventoryForm.get('color').value;
      const numberOfWheels = this.inventoryForm.get('numberOfWheels').value;
      const serialNumber = this.inventoryForm.get('serialNumber').value;
      
     const inventory = { inventoryItemId, catalogId, color, numberOfWheels, serialNumber };
    console.log(this.dialogRef.id)

      
    this.inventoryService.updateInventoryItem(Number(inventoryItemId),inventory).subscribe((data) => {
      if(data){
        this.itemUpdated.emit();
        this.dialogRef.close(true);
      }else{
        console.log('there was a problem updating item')
      }    
    })       
  }
  

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

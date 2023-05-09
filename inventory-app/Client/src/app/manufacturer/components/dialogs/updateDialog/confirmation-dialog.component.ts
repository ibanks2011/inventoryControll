import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManufacturerService } from 'src/app/manufacturer/services/manufacturer.service';



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationUpdateDialogComponent {
  @Output() manufacturerUpdated= new EventEmitter<void>();
  inventoryItem: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private manufactureService: ManufacturerService,
  ) {}
 

  manufacturerForm = new FormGroup({
    companyName: new FormControl(''),
  });


  updateManufacturer() {      

     const manufacturerId = this.dialogRef.id
     const companyName = this.manufacturerForm.get('companyName').value;      
     const manufacture = { manufacturerId, companyName };
     if(companyName != ""){ 
      this.manufactureService.updateManufacturer(Number(manufacturerId),manufacture).subscribe(()=>{
      this.manufacturerUpdated.emit();
      this.dialogRef.close(true);
    })  
  }
      
  }
  

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

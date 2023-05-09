import { Component,Output,EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { ManufacturerService } from '../../services/manufacturer.service';



@Component({
    selector: 'manufacturer-form',
    templateUrl: './manufacturerForm.component.html',
    styleUrls: ['./manufacturerForm.component.css']
})
export class ManufacturerFormComponent {
  @Output() manufacturerAdded = new EventEmitter<void>();

    constructor(private manufacturerService: ManufacturerService){}
    

    manufacturerForm = new FormGroup({
      companyName: new FormControl(''),
    });


    addManufacturer() {
      if (this.manufacturerForm.valid) {
        const companyName = this.manufacturerForm.get('companyName').value;
        let manufacturerId: number
        const manufacturer = { companyName , manufacturerId};
    
        this.manufacturerService.addManufacturer(manufacturer).subscribe(() => {
          this.manufacturerAdded.emit();
          this.manufacturerForm.reset();
        });
      }
    }
    
    
}



import { Component,Output,EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';


@Component({
    selector: 'catalog-form',
    templateUrl: './catalogForm.component.html',
    styleUrls: ['./catalogForm.component.css']
})
export class CatalogFormComponent {
  @Output() catalogAdded = new EventEmitter<void>();

    constructor(private catalogService: CatalogService){}
    

    catalogForm = new FormGroup({
      manufacturerId: new FormControl(null),
      description: new FormControl(''),
      vehicleType: new FormControl(''),
    });


    addCatalog() {      

        const manufacturerId = this.catalogForm.get('manufacturerId').value;
        const description = this.catalogForm.get('description').value;
        const vehicleType = this.catalogForm.get('vehicleType').value;
        let catalogId: any;
        
       const catalog = { catalogId, manufacturerId, description, vehicleType };
        
      this.catalogService.add(catalog).subscribe((data) => {
        if(data){
          this.catalogAdded.emit()
        }else{
          console.log('there was a problem adding catalog')
        }        
      })        
    }
    
}



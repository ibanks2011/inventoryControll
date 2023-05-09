import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/catalog/services/catalog.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CountryInterface } from 'src/app/country/types/country.interface';
import { CountryService } from 'src/app/country/services/countryService';
import { HttpErrorResponse } from '@angular/common/http';
import { CompleteCatalogInterface } from 'src/app/catalog/types/complete.catalog.interface';
import { ManufacturerService } from 'src/app/manufacturer/services/manufacturer.service';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationUpdateDialogComponent {
  @Output() catalogUpdated= new EventEmitter<void>();
  manufacturers: any;

  //filtered countries
  selectedCountry: CountryInterface;
  private subs = new Subscription();
  options: CountryInterface[] = [];
  filteredJSONDataOptions: Observable<any[]>;
  jsonControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ConfirmationUpdateDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) 
              public message: string,
              private catalogService: CatalogService,
              private countryService: CountryService,
              private manufacturerService: ManufacturerService,) { 
    this.manufacturerService.getData().subscribe((data) => {
    this.manufacturers = data;
  })}
 

  inventoryForm = new FormGroup({
    manufacturer: new FormControl(null),
    description: new FormControl(""),
    vehicleType: new FormControl(''),
    country: new FormControl(''),
  });


  updateCatalog() {      

      const catalogId = parseInt(this.dialogRef.id)
      const manufacturer = this.inventoryForm.get('manufacturer').value;
      const description = this.inventoryForm.get('description').value;
      const vehicleType = this.inventoryForm.get('vehicleType').value;
      const country = this.selectedCountry;      
     const catalog: CompleteCatalogInterface = { catalogId , manufacturer, description, vehicleType , country};

    this.catalogService.updateCatalog(Number(catalogId),catalog).subscribe((data) => {
      if(data){
        this.catalogUpdated.emit();
        this.dialogRef.close(true);
      }else{
        console.log('there was a problem updating catalog')
      }    
    })      
  }

  ngOnInit(): void {
    this.subs.add(this.countryService.getCountries().subscribe((data) => {
       this.options = data;
     },
     (err: HttpErrorResponse) => {
       console.log(err);
     }));
 
     this.filteredJSONDataOptions = this.jsonControl.valueChanges.pipe(
       startWith(''),
       map(value => this.json_data_filter(value))
     );
   }
 
   ngOnDestroy(): void {
     if (this.subs) {
       this.subs.unsubscribe();
     }
   }

     // JSON Data Filter
private json_data_filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  let newList = [];
  this.options.forEach(element => {
    if (element.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
      newList.push({'name': element.name, 'countryCode': element.countryCode });
    }
  })
  return newList;
}
  
  public onSelect(value: CountryInterface): void {
    this.selectedCountry = value;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

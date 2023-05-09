import { Component,Output,EventEmitter,  OnDestroy, OnInit  } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CountryInterface } from 'src/app/country/types/country.interface';
import { CountryService } from 'src/app/country/services/countryService';
import { CompleteCatalogInterface } from 'src/app/catalog/types/complete.catalog.interface';
import { ManufacturerService } from 'src/app/manufacturer/services/manufacturer.service';
import { ManufacturerInterface } from 'src/app/manufacturer/types/manufacturer.interface';


@Component({
    selector: 'catalog-form-with-man-state',
    templateUrl: './catalogFormWithManState.html',
    styleUrls: ['./catalogFormWithManState.css']
})
export class catalogFormWithManState implements OnInit, OnDestroy{
  @Output() catalogAdded = new EventEmitter<void>();
  manufacturers: any;

  private countrySubs = new Subscription();
  selectedCountry: CountryInterface;  
  countryOptions: CountryInterface[] = [];
  filteredJSONCountries: Observable<any[]>;
  jsonCountryControl = new FormControl();


  private manufacturerSubs = new Subscription();
  selectedManufacturer: ManufacturerInterface;  
  manufacturerOptions: ManufacturerInterface[] = [];
  filteredJSONManufacturers: Observable<any[]>;
  jsonManufacturerControl = new FormControl();

    constructor(private catalogService: CatalogService,private countryService: CountryService, private manufacturerService: ManufacturerService){
      // this.manufacturerService.getData().subscribe((data) => {
      //   this.manufacturers = data;
      // })
    }

    ngOnInit(): void {
      this.countrySubs.add(this.countryService.getCountries().subscribe((data) => {
         this.countryOptions = data;
       },
       (err: HttpErrorResponse) => {
         console.log(err);
       }));

      this.manufacturerSubs.add(this.manufacturerService.getData().subscribe((data) => {
        this.manufacturerOptions = data;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }));

   
       this.filteredJSONCountries = this.jsonCountryControl.valueChanges.pipe(
         startWith(''),
         map(value => this.json_country_filter(value))
       );

      this.filteredJSONManufacturers = this.jsonManufacturerControl.valueChanges.pipe(
        startWith(''),
        map(value => this.json_manufacturer_filter(value))
      );

     }
   
     ngOnDestroy(): void {
       if (this.countrySubs) {
         this.countrySubs.unsubscribe();
       }
       if (this.manufacturerSubs) {
        this.manufacturerSubs.unsubscribe();
      }
     }

       // JSON Data Filter
  private json_country_filter(value: string): string[] {
    let newList = [];

    this.countryOptions.forEach(element => {
      if (element.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'name': element.name, 'countryCode': element.countryCode });
      }
    })
    return newList;
  }

  private json_manufacturer_filter(value: string): string[] {
    let newList = [];
    
    this.manufacturerOptions.forEach(element => {
      if (element.companyName.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'companyName': element.companyName, 'manufacturerId': element.manufacturerId });
      }
    })
    return newList;
  }


  public onCountrySelect(value: CountryInterface): void {
    this.selectedCountry = value;
  }

  public onManufacturerSelect(value: ManufacturerInterface): void {
    this.selectedManufacturer = value;
  }
    

  catalogForm = new FormGroup({
    manufacturer: new FormControl(),
    description: new FormControl(''),
    vehicleType: new FormControl(''),
    country: new FormControl()
  });


    addCatalog() {      

        const manufacturer = this.selectedManufacturer
        const description = this.catalogForm.get('description').value;
        const vehicleType = this.catalogForm.get('vehicleType').value;
        const country = this.selectedCountry
        let catalogId: any;        
       const catalog: CompleteCatalogInterface = { catalogId, manufacturer, description, vehicleType,country };
      this.catalogService.addCatalog(catalog).subscribe((data) => {
        if(data){
          this.catalogAdded.emit();
          this.catalogForm.reset();
        }else{
          console.log('problem adding catalog')
        }
      })   
        
    }
    
}



import { Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from "../dialogs/deleteDialog/confirmation-dialog.component";
import { MatPaginator} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationUpdateDialogComponent } from "../dialogs/updateDialog/confirmation-dialog.component";
import { SelectionModel } from '@angular/cdk/collections';
import { CatalogService } from "../../services/catalog.service";
import { CompleteCatalogInterface } from "../../types/complete.catalog.interface";
import { MatSnackBar } from "@angular/material/snack-bar";






@Component({
    selector: 'catalog-table',
    templateUrl: './catalogTable.component.html',
    styleUrls: ['./catalogTable.component.css']
})
export class CatalogTableComponent implements OnInit{
    displayedColumns: string[] = [ 'select','catalogId', 'manufacturer','country', 'description', 'vehicleType'];
    dataSource :  MatTableDataSource<CompleteCatalogInterface>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    catalogs : any;
    selection = new SelectionModel<CompleteCatalogInterface>(true, []);    
    highlightedRow: boolean = false;
    firstLastButtons= true;
    selectedRow: CompleteCatalogInterface | null = null;
  
   

    constructor(private catalogservice: CatalogService, private dialog: MatDialog, private snackBar: MatSnackBar){
        this.dataSource = new MatTableDataSource(this.catalogs)
        this.loadData()
        console.log(localStorage.getItem("token"))


        //fix for table not sorting nested properties
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          switch (sortHeaderId) {
            case 'manufacturer':
              return data.manufacturer.companyName;
            case 'country':
              return data.country.name;
            default:
              return data[sortHeaderId];
          }
        };
    }

    loadData(){
      this.catalogservice.getData().subscribe((data) => {
        this.catalogs = data
        this.dataSource.data = this.catalogs
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    }

    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
      this.dataSource.filterPredicate = (data, filter) => {
        const catalogId = data.catalogId.toString();
        const manufacturer = data.manufacturer.companyName.toLowerCase();
        const country = data.country.name.toLowerCase();
        const description = data.description.toLowerCase();
        const vehicleType = data.vehicleType.toLowerCase();
        
        return manufacturer.includes(filter)
          || catalogId.includes(filter)
          || country.includes(filter)
          || description.includes(filter)
          || vehicleType.includes(filter)
      };
    
      this.dataSource.filter = filterValue;

      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage()
      }
    }


    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    ngOnInit(): void {    }

    confirmUpdate(id: any) {
      const dialogRef = this.dialog.open(ConfirmationUpdateDialogComponent, {
        width: '350px',
        data: 'Are you sure you want to update this catalog?',
        id: id
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadData();
        }
      });
    }

    confirmDelete(id: any) {
        const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
          width: '375px',
          data: 'Are you sure you want to delete Catalog: ' + id + ' ?'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteCatalog(id);
          }
        });
      }

      deleteCatalog(id: any) {
        this.catalogservice.deleteCatalog(id).subscribe(
          () => {
            this.selection.clear();
            this.loadData();
            this.snackBar.open('Catalog deleted successfully.', 'Close', {
              duration: 5000,
            });
          },
          (error) => {
            if (error.status === 409) {
              console.error('Cannot delete Catalog:', error.error);
              this.snackBar.open( error.error, 'Close', {duration: 5000, });
            } else {

              //need to fix json error
              console.error('Error deleting manufacturer:', error);
              this.snackBar.open('Catalog deleted successfully.', 'Close', {duration: 5000,});
              
            }
            this.selection.clear();
            this.loadData();
          }
        );
      }

    highlightRow(highlight: boolean) {
        this.highlightedRow = highlight;
      }

    
      trashClicked(event: MouseEvent) {
        if (this.selection.hasValue()) {
            if(this.selection.selected.length < 5){
              this.selection.selected.forEach(item => {
              this.confirmDelete(item.catalogId);
            });
          }else{
            const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
              width: '375px',
              data: 'Are you sure you want to delete ' + this.selection.selected.length + ' catalogs?'
            });
          
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.selection.selected.forEach(item => {
                  this.deleteCatalog(item.catalogId);                  
                });
                this.selection.clear()
              }
            });
          }
        }
      }

      isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }
      
      masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
      }
    
    
}      
      
 
import { Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from "../dialogs/deleteDialog/confirmation-dialog.component";
import { MatPaginator} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationUpdateDialogComponent } from "../dialogs/updateDialog/confirmation-dialog.component";
import { SelectionModel } from '@angular/cdk/collections';
import { ManufacturerInterface } from "../../types/manufacturer.interface";
import { ManufacturerService } from "../../services/manufacturer.service";







@Component({
    selector: 'manufacturer-table',
    templateUrl: './manufacturerTable.component.html',
    styleUrls: ['./manufacturerTable.component.css']
})
export class ManufacturerTableComponent implements OnInit{
    displayedColumns: string[] = [ 'select','manufacturerId', 'companyName'];
    dataSource :  MatTableDataSource<ManufacturerInterface>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    manufacturers : any;
    selection = new SelectionModel<ManufacturerInterface>(true, []);    
    highlightedRow: boolean = false;
    firstLastButtons= true;
    selectedRow: ManufacturerInterface | null = null;
  
   

    constructor(private manufacturerService: ManufacturerService, private dialog: MatDialog, private snackBar: MatSnackBar){
        this.dataSource = new MatTableDataSource(this.manufacturers)
        this.loadData()
    }

    loadData(){
      this.manufacturerService.getData().subscribe((data : ManufacturerInterface) => {
        this.manufacturers = data
        this.dataSource.data = this.manufacturers
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    }

    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase()
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage()
      }
    }

    
    ngOnInit(): void {    }

    confirmUpdate(id: any) {
      const dialogRef = this.dialog.open(ConfirmationUpdateDialogComponent, {
        width: '350px',
        data: 'Are you sure you want to delete this manufacturer?',
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
          data: 'Are you sure you want to delete item: ' + id + ' ?'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteInventory(id);
          }
        });
      }

      deleteInventory(id: any) {
        this.manufacturerService.deleteManufacturer(id).subscribe(
          (data) => {
            console.log(data)
            this.selection.clear();
            this.loadData();
            this.snackBar.open('Manufacturer deleted successfully.', 'Close', {duration: 5000,});
          },
          (error) => {
            if (error.status === 409) {
              this.snackBar.open( error.error, 'Close', {duration: 5000, });
            } else {
              //getting invalid parse json error
              this.snackBar.open('Manufacturer deleted successfully.', 'Close', {duration: 5000,});
              
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
          this.selection.selected.forEach(item => {
            this.confirmDelete(item.manufacturerId);
          });
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
      
 
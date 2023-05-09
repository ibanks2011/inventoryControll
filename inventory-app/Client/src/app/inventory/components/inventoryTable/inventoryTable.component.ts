import { Component, OnInit, ViewChild } from "@angular/core";
import { InventoryService } from "../../services/inventory.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from "../../confirmation-dialog/Delete/confirmation-dialog.component";
import { MatPaginator} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationUpdateDialogComponent } from "../../confirmation-dialog/Update/confirmation-dialog.component";
import { SelectionModel } from '@angular/cdk/collections';
import { InventoryResponseInterface } from "../../types/inventory.response.interface";

@Component({
    selector: 'inventory-table',
    templateUrl: './inventoryTable.component.html',
    styleUrls: ['./inventoryTable.component.css']
})

export class InventoryTableComponent implements OnInit{
  displayedColumns: string[] = [ 'select','id', 'description', 'color', 'numberOfWheels', 'serialNumber', 'country'];
  dataSource :  MatTableDataSource<InventoryResponseInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  inventory : any;
    selection = new SelectionModel<InventoryResponseInterface>(true, []);    
    highlightedRow: boolean = false;
    firstLastButtons= true;
    selectedRow: InventoryResponseInterface | null = null;  

    constructor(private inventoryService: InventoryService, private dialog: MatDialog){
        this.dataSource = new MatTableDataSource(this.inventory)
        this.loadData()

                //fix for table not sorting nested properties
                this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
                  switch (sortHeaderId) {
                    case 'description':
                      return data.catalog.description
                    case 'id':
                      return data.inventoryItemId;
                    case 'catalogId':
                      return data.catalog.catalogId;
                      case 'country':
                        return data.country.name;
                    default:
                      return data[sortHeaderId];
                  }
                };
    }

    loadData(){
      this.inventoryService.getData().subscribe((data) => {
        console.log(data)
        this.inventory = data
        this.dataSource.data = this.inventory
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    }

    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();    
      this.dataSource.filterPredicate = (data, filter) => {
        const catalogId = data.catalog.catalogId.toString();
        const description = data.catalog.description.toLowerCase()
        const color = data.color.toLowerCase();
        const numberOfWheels = data.numberOfWheels.toString();
        const serialNumber = data.serialNumber.toLowerCase();
        const countryName = data.country.name.toLowerCase();        
        return countryName.includes(filter)
          || catalogId.includes(filter)
          || color.includes(filter)
          || numberOfWheels.includes(filter)
          || serialNumber.includes(filter)
          || description.includes(filter)
      };
    
      this.dataSource.filter = filterValue;

      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage()
      }
    }

    
    ngOnInit(): void {    }

    confirmUpdate(id: any) {
      const dialogRef = this.dialog.open(ConfirmationUpdateDialogComponent, {
        width: '350px',
        data: 'Are you sure you want to delete this item?',
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

    deleteInventory(id: any){
        this.inventoryService.deleteInventoryItem(id).subscribe(() => {
          this.selection.clear();
          this.loadData();
        }) 
    }

    
    highlightRow(highlight: boolean) {
        this.highlightedRow = highlight;
      }

      trashClicked(event: MouseEvent) {
        if (this.selection.hasValue()) {
            if(this.selection.selected.length < 5){
              this.selection.selected.forEach(item => {
              this.confirmDelete(item.inventoryItemId);
            });
          }else{
            const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
              width: '375px',
              data: 'Are you sure you want to delete ' + this.selection.selected.length + ' items?'
            });
          
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.selection.selected.forEach(item => {
                  this.deleteInventory(item.inventoryItemId);                  
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
      
 
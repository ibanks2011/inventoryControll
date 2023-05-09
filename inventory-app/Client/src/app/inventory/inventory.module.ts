import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InventoryFormComponent } from "./components/forms/inventoryForm/inventoryForm.component";
import { InventoryFormWithCatalogComponent } from "./components/forms/inventoryFormWithCatalog/inventoryFormWithCatalog.component";
import { InventoryService } from "./services/inventory.service";
import { InventoryTableComponent } from "./components/inventoryTable/inventoryTable.component";
import { ConfirmationDeleteDialogComponent } from "./confirmation-dialog/Delete/confirmation-dialog.component";
import { ConfirmationUpdateDialogComponent } from "./confirmation-dialog/Update/confirmation-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";



@NgModule({
    imports: [
        
        CommonModule, 
        MatTableModule, 
        MatSortModule, 
        MatPaginatorModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatDialogModule,
       
    ],
    declarations: [
        InventoryTableComponent,
        InventoryFormComponent,
        InventoryFormWithCatalogComponent,
        ConfirmationDeleteDialogComponent,
        ConfirmationUpdateDialogComponent,
    ],
    exports: [InventoryTableComponent, InventoryFormComponent, InventoryFormWithCatalogComponent],
    providers: [InventoryService, MatPaginator]
})
export class InventoryModule {}
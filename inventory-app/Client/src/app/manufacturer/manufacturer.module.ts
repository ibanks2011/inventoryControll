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
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { ManufacturerService } from "./services/manufacturer.service";
import { ManufacturerTableComponent } from "./components/manufacturerTable/manufacturerTable.component";
import { ManufacturerFormComponent } from "./components/manufacturerForm/manufacturerForm.component";
import { ConfirmationUpdateDialogComponent } from "./components/dialogs/updateDialog/confirmation-dialog.component";
import { ConfirmationDeleteDialogComponent } from "./components/dialogs/deleteDialog/confirmation-dialog.component";



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
        ManufacturerTableComponent,
        ManufacturerFormComponent,
        ConfirmationDeleteDialogComponent,
        ConfirmationUpdateDialogComponent,

    ],
    exports: [ManufacturerFormComponent, ManufacturerTableComponent],
    providers: [ManufacturerService, MatPaginator]
})
export class ManufacturerModule {}
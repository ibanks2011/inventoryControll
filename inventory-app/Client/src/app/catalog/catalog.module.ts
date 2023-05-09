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
import { CatalogService } from "./services/catalog.service";
import { CatalogTableComponent } from "./components/catalogTable/catalogTable.component";
import { CatalogFormComponent } from "./components/forms/catalogForm/catalogForm.component";
import { catalogFormWithManState } from "./components/forms/catalogFormWithManState/catalogFormWithManState";
import { ConfirmationDeleteDialogComponent } from "./components/dialogs/deleteDialog/confirmation-dialog.component";
import { ConfirmationUpdateDialogComponent } from "./components/dialogs/updateDialog/confirmation-dialog.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSnackBar } from "@angular/material/snack-bar";





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
        MatAutocompleteModule,
       
    ],
    declarations: [ 
        CatalogTableComponent,
        CatalogFormComponent,
        catalogFormWithManState,
        ConfirmationDeleteDialogComponent,
        ConfirmationUpdateDialogComponent
    ],
    exports: [CatalogTableComponent, CatalogFormComponent, catalogFormWithManState],
    providers: [CatalogService,MatPaginator, MatSnackBar]
})
export class CatalogModule {}
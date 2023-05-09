import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CatalogViewComponent } from './catalog/view/catalogView.component';
import { HomeComponent } from './home/home.component';



import { InventoryViewComponent } from './inventory/view/inventoryView.component';
import { ManufactureViewComponent } from './manufacturer/view/manufactureView.component';
import { StatusComponent } from './status/status.component';

const role = localStorage.getItem('token')

const routes: Routes = [
  
  {path:"", component:ManufactureViewComponent},
  {path:"about", component:AboutComponent},
  {path:"catalog", component:CatalogViewComponent},
  {path:"inventory", component:InventoryViewComponent},
  {path:"manufacturer", component:ManufactureViewComponent},
    // lazy loading
  {path:"access",loadChildren:()=>import('./access/access.module').then(opt=>opt.AccessModule)},
  {path:"login", loadComponent:()=>import('./access/login/login.component').then(opt=>opt.LoginComponent)},



  // 404page
  {path:"**", component:StatusComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

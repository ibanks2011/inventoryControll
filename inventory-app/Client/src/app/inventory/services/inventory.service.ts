import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { InventoryInterface } from '../types/inventory.interface';
import { InventoryResponseInterface } from '../types/inventory.response.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly inventoryUrl = "http://localhost:8082/api/inventory-items";
  private readonly inventoryResponseUrl = "http://localhost:8082/api/inventory-items/InventoryResponse";
  private readonly catalogUrl = "http://localhost:8082/api/catalogs";
  private readonly authHeader = 'Basic ' + btoa('mike:important'); // username and password

  constructor(private http: HttpClient) {  }

  getData() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get(this.inventoryResponseUrl , {headers})
  }

  getCatalogs() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get(this.catalogUrl,{headers})
  }




  addInventoryItem(item: InventoryInterface) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.post<InventoryInterface>(this.inventoryUrl, item, {headers});
  }

  deleteInventoryItem(id: any)  : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.inventoryUrl}/${id}`; 
    return this.http.delete(url, {headers});  
  }

  updateInventoryItem(id: number, updatedItem: any)  : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.put<InventoryInterface>(url, updatedItem, { headers })
  }
}

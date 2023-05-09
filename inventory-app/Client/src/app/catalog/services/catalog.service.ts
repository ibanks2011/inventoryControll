import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogInterface } from '../types/catalog.interface';
import { CompleteCatalogInterface } from '../types/complete.catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private readonly catalogUrl = "http://localhost:8082/api/catalogs";
  private readonly completeCatalogUrl = "http://localhost:8082/api/catalogs/completeCatalog";
  private readonly authHeader = 'Basic ' + btoa('mike:important'); // username and password

  constructor(private http: HttpClient) {  }

  getData() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get(this.completeCatalogUrl , {headers})
  }

  addCatalog(item: CompleteCatalogInterface): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.post<CatalogInterface>(this.catalogUrl, item, {headers});
  }

  deleteCatalog(id: any) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.catalogUrl}/${id}`; 
    return this.http.delete(url, {headers});  
  }

  updateCatalog(id: number, updatedCatalog: any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.catalogUrl}/${id}`;
    return this.http.put<CatalogInterface>(url, updatedCatalog, { headers });
  }

  add(catalog: { catalogId: any; manufacturerId: any; description: string; vehicleType: string; }) {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.post<CatalogInterface>(this.catalogUrl, catalog, {headers});
  }
}

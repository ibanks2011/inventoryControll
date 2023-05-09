import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManufacturerInterface } from '../types/manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private readonly manufacturerUrl = "http://localhost:8082/api/manufacturers";
  private readonly authHeader = 'Basic ' + btoa('mike:important'); // username and password

  constructor(private http: HttpClient) {  }

  getData() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get(this.manufacturerUrl , {headers})
  }

  addManufacturer(manufacture: ManufacturerInterface) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.post<ManufacturerInterface>(this.manufacturerUrl, manufacture, {headers});
  }

  deleteManufacturer(id: any) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.manufacturerUrl}/${id}`; 
    return this.http.delete(url, {headers});  
  }

  updateManufacturer(id: number, updatedManufacturer: any) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    const url = `${this.manufacturerUrl}/${id}`;
    return this.http.put<ManufacturerInterface>(url, updatedManufacturer, { headers });
  }
}

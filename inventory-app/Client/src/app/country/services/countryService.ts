import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly countryUrl = "http://localhost:8082/api/countries";
  private readonly authHeader = 'Basic ' + btoa('mike:important'); // username and password

  constructor(private http: HttpClient) {  }

  public getCountries() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get(this.countryUrl , {headers})
  }

}

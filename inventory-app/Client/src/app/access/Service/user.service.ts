import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8082' //backend server URL
    })
  };

  constructor(private http:HttpClient) { 

  } 

  ProceedLogin(inputdata:any): Observable<any>{
    let token = this.http.post('http://localhost:8082/api/login', inputdata);

    
    return token;
  }

  Registeration(inputdata:any){
    return this.http.post('http://localhost:8082/api/register', inputdata);
  }
}

import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  user = new Subject() ;

  APi = 'http://localhost:3000/'
  createUser(model : any) {
    return this.http.post( this.APi+'students' , model)
  }
  getStudents (type:string) {
    return this.http.get(this.APi+type)
  }
  getRole(){
    return this.http.get(this.APi+'login/1')

  }
  login (model : any){
    return this.http.put(this.APi + 'login/1' , model)
  }
}

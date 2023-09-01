import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  APi = 'http://localhost:3000/'
  createUser(model : any) {
    return this.http.post( this.APi+'students' , model)
  }
  getStudents () {
    return this.http.get(this.APi+'students')
  }
}

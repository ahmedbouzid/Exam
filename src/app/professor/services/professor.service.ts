import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private http: HttpClient) {}
  API = 'http://localhost:3000/';
  createSubject(model: any) {
    return this.http.post(this.API + 'subjects ', model);
  }
  updateSubject( id :number, model :any ) {
    return this.http.put(this.API +'subjects/' + id  , model)
  }

}

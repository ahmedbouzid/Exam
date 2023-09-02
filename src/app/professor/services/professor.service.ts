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
  getAllSubjects() {
    return this.http.get(this.API+'subjects')
  }

  deleteSubject(id : number) {
   return this.http.delete(this.API +'subjects/'+id)
  }
  getOneSubject(id : number) {
    return this.http.get(this.API +'subjects/'+ id)
  }
}

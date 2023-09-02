import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessorService } from 'src/app/professor/services/professor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent  implements OnInit{
  id : any ;
  oneSubject : any ;
  user : any ;
constructor(
  private currentRoute : ActivatedRoute,
  private service : ProfessorService ,
  private authService : AuthService,
  private toast : ToastrService
  ){

}


  ngOnInit(): void {
    this.id = this.currentRoute.snapshot.paramMap.get('id')
    this.getOneSubject()
    this.getUserInfo()
  }

  getOneSubject(){
    this.service.getOneSubject(this.id).subscribe(res => {
      this.oneSubject = res ;
    })
  }
  delete(index:number){

    this.oneSubject.questions.splice(index , 1) ;
    const model = {
      name:this.oneSubject.name ,
      questions :this.oneSubject.questions
    }
    this.service.deleteSubject(this.id).subscribe(res => {
      this.toast.success('Delete Succufully')
    })


  }
  getUserInfo() {
    this.authService.getRole().subscribe((res) => {
      this.user = res ;
      console.log('USer Info ====================================');
      console.log(this.user);
      console.log('====================================');
    })
  }
}

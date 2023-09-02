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
  SCORESTUDENT :any ;
  showResult : boolean = false ;
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
  getAnswer(event :any) {

   let value = event.value ;
   let  questionIndex = event.source.name ;
   this.oneSubject.questions[questionIndex].studentAnswer = value ;
   console.log('====================================');
   console.log( this.oneSubject.questions);
   console.log('====================================');
  }
  result(){
    this.SCORESTUDENT = 0
      for(let x in this.oneSubject.questions) {
        if(this.oneSubject.questions[x].studentAnswer == this.oneSubject.questions[x].correct)
        this.SCORESTUDENT++ ;
        console.log('====================================');
        console.log(this.SCORESTUDENT);
        console.log('====================================');
      }
      this.showResult = true ;

  }

}

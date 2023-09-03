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
  studentInfo : any ;
  userSubjects : any[]= [] ;
  // ** For checking if exam already validate
  validExamBo :boolean = true ;
constructor(
  private currentRoute : ActivatedRoute,
  private service : ProfessorService ,
  private authService : AuthService,
  private toast : ToastrService
  ){

}


  ngOnInit(): void {
    this.id = this.currentRoute.snapshot.paramMap.get('id')
    this.getOneSubject() ;
    this.getLoggedInUserInfo() ;


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
  getLoggedInUserInfo() {
    this.authService.getRole().subscribe((res) => {
      this.user = res ;

      this.getUserData()
    })
  }
getUserData(){
this.authService.getStudent(this.user.userID).subscribe((res :any) => {
this.studentInfo = res ;
this.userSubjects = res?.subjects ? res?.subjects : [] ;
this.validExam() ;
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

      }
      this.showResult = true ;
      this.userSubjects.push({
        name : this.oneSubject.name,
        id : this.id ,
        degree : this.SCORESTUDENT
      })
      const model = {
        username : this.studentInfo.username ,
        email : this.studentInfo.email ,
        password : this.studentInfo.password ,
        subjects : this.userSubjects
      }
      this.authService.updateUser(this.user.userID , model).subscribe( res => {
        this.toast.success('Result Registered Succufully')
      })

  }

  validExam() {
    for(let x in this.userSubjects) {
      if(this.userSubjects[x].id == this.id) {
        this.SCORESTUDENT = this.userSubjects[x].degree ;
        this.validExamBo = false ;
        this.toast.warning('Exercice has been completed')
      }
    }
    console.log('====================================');
    console.log(this.validExamBo);
    console.log('====================================');
  }

}

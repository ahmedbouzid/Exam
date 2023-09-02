import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent  implements OnInit{

// *** controls declaration
name = new FormControl('')
questionForm !: FormGroup ;
// *** list of questions
questions : any [] = [] ;
// ** The Correct answer
correctId : any;
// ** boolean for controlling the stepper
startAdd :boolean = false ;
preview : boolean = false ;
// ** var for save subject name from name control
subjectName :any = '' ;
// ** var for controlling stepper steps
stepperIndex = 0 ;
// *** id for deleting
id :any ;

constructor(
  private fb : FormBuilder ,
  private toast : ToastrService ,
  private service : ProfessorService
) {}
  ngOnInit(): void {
    this.createQuestionForm()
    console.log('====================================');
    console.log(this.questions);
    console.log('====================================');
  }

  createQuestionForm() {
    this.questionForm = this.fb.group({
      question : ['' , [Validators.required]],
      answer1 : ['' , [Validators.required]],
      answer2 : ['' , [Validators.required]],
      answer3 : ['' , [Validators.required]],
      answer4 : ['' , [Validators.required]],

    })
  }

  onSave() {
    const model = {
      name : this.subjectName ,
      questions : this.questions
    }

    if (this.preview) {
      this.stepperIndex = 2 ;
    } else {
      // ** this  for calling service one time after creating and input one time the model in db
      this.service.createSubject(model).subscribe((res : any) => {
        this.preview = true ;
        // ** get if Value the subject
        this.id = res.id ;
      })
    }
  }
  createQuestion(){
    if (this.correctId) {
      const model ={
          question : this.questionForm.value.question ,
          answer1 : this.questionForm.value.answer1 ,
          answer2: this.questionForm.value.answer2 ,
          answer3: this.questionForm.value.answer3 ,
          answer4: this.questionForm.value.answer4 ,
          correct :this.questionForm.value[this.correctId]

      }
      this.questions.push(model)
      this.questionForm.reset()
    } else {
      this.toast.error('Please Choose the Correct Answer')
    }
    console.log('====================================');
    console.log(this.questions);
    console.log('====================================');
  }
  getCorrect(event:any){
  this.correctId = event.value

  }
  onStart(){
    if(this.name.value == "" ) {
      this.toast.error('Please Enter question')
    } else {
      this.startAdd =true ;
      this.subjectName = this.name.value ;

    }
    if(this.startAdd) {
      this.stepperIndex = 1
    }
  }
  clearAll(){
    this.questionForm.reset()
  }
  onCancel(){
    this.questionForm.reset() ;
    this.questions = [] ;
    this.subjectName = '' ;
    this.name.reset() ;
    this.stepperIndex = 0 ;
    this.startAdd = false ;
  }

  delete(index : number) {
    this.questions.splice(index , 1);
    const model ={
      name: this.subjectName ,
      questions : this.questions
    }
    this.service.updateSubject( this.id , model).subscribe(res => {
      this.toast.success('Question Delete Succufully')
    })
  }
}

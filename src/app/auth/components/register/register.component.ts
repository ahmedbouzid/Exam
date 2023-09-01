import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm  !: FormGroup ;
  constructor( private formBuilder : FormBuilder) {}

    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

  CreateForm( ){
    this.userForm = this.formBuilder.group ({
      username : ['' , Validators.required] ,
      email : ['' , Validators.required] ,
      password : ['' , Validators.required] ,
      confirmPassword : ['' , Validators.required]


    })
  }
}

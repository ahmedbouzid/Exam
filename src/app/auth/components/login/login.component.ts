
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup ;
  users : any[] = [] ;
  type :string = 'students'
  constructor(
    private service :AuthService ,
    private toastr : ToastrService ,
    private router : Router ,
    private fb : FormBuilder

  ) {}

  ngOnInit(): void {
    this.getUsers() ;
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      type : [this.type],
      email : ['' , [Validators.required , Validators.email]],
      password : ['' , [Validators.required]]
    })
  }
  getUsers() {
    this.service.getStudents(this.type).subscribe((user: any)=>{
      this.users = user ;
    } )
  }
  formSubmission() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const user = this.users.find((u) => u.email === email && u.password === password);

    if (!user) {
      this.toastr.error('Incorrect Email or Password');
    } else {
      const model = {
        username: user.username,
        email : user.email,
        role: this.type,
      };

      this.service.login(model).subscribe((res) => {
        this.service.user.next(res)
        this.toastr.success('You have successfully logged in');
        this.router.navigate(['subjects']);
      });
    }
  }
  getRole(event:any){
    this.type = event.value
    console.log('====================================');
    console.log(event.value);
    console.log('====================================');
    // ** For fetch user with on change button in checkbox button if students fetch students else professor
    this.getUsers()
  }

}

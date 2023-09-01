import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  students: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
    this.getAllStudents();
  }

  CreateForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  formSubmission() {
    const model = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    // Check if the email already exists in the students array
    const emailExists = this.students.some((student) => student.email === model.email);

    if (emailExists) {
      this.toastr.error('Email already exists');
    } else {
      this.service.createUser(model).subscribe((res) => {
        this.toastr.success('Account created successfully');
        this.router.navigate(['subjects']);
      });
    }
  }

  getAllStudents() {
    this.service.getStudents('students').subscribe((students: any) => {
      this.students = students;
      console.log('Students:', this.students);
    });
  }
}

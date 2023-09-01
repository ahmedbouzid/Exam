import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    CommonModule ,
    HttpClientModule ,
    ReactiveFormsModule ,
    RouterModule ,
    BrowserModule ,
    ToastrModule.forRoot(), // Add this to your module
  ],
  exports : [
    HttpClientModule ,
    ReactiveFormsModule ,
    BrowserModule ,
    RouterModule
  ]
})
export class AuthModule { }

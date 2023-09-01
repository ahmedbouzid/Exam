import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatrialModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports:[
    HttpClientModule,
    BrowserModule,
    RouterModule,
    MatrialModule,
    CommonModule,
    NavbarComponent,
    MatRadioModule,

  ]
})
export class SharedModule { }

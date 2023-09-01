import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatrialModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserModule
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { AdminComponent } from './admin.component';
import { ErrorComponent } from './error.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    ContactComponent,
    AdminComponent,
    ErrorComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

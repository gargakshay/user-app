import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTableModule, ButtonModule, DialogModule, GrowlModule, DropdownModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserData } from './add-user/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    GrowlModule,
    DropdownModule
  ],
  providers: [UserData],
  bootstrap: [AppComponent]
})
export class AppModule { }

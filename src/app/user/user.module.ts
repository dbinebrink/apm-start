import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,  
    RouterModule.forChild([ 
      { path: 'login', component: LoginComponent }  // use forChild routes with feature modules
    ])
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }

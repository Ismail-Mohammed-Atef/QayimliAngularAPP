import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddnewreviewComponent } from './reviews/addnewreview/addnewreview.component';
import { ContactusComponent } from './contactus/contactus.component';
import { authGuard } from './gaurds/auth.guard';
import { GetreviewsComponent } from './reviews/getreviews/getreviews.component';
import { ShowreviewdetailsComponent } from './reviews/showreviewdetails/showreviewdetails.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword/:mostafa', component: ResetpasswordComponent},
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'addnewreview', canActivate: [authGuard], component: AddnewreviewComponent },
  { path: 'reviews', canActivate: [authGuard], component: GetreviewsComponent },
  { path: 'review/:mostafa', component: ShowreviewdetailsComponent },
  { path: '**', component: NotfoundComponent }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ShowProjectComponent } from './show-project/show-project.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'show-project', component: ShowProjectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

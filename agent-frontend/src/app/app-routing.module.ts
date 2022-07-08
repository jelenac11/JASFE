import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { CompanyRequestsComponent } from './company-requests/company-requests.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: CallbackComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'get:companies'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'company-registration',
    component: CompanyRegistrationComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'post:company-request'
    }
  },
  {
    path: 'company-requests',
    component: CompanyRequestsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'update:company-request'
    }
  },
  {
    path: '**',
    component: CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

import { TodoListComponent, UsersComponent, RegisterComponent, LoginComponent } from './components/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
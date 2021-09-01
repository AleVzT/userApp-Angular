import { Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const ROUTES: Routes = [
    { path: 'home', component: UserListComponent },
    { path: 'newUser', component:  UserAddComponent },
    { path: 'updateUser/:id', component:  UserAddComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];



import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'user-profiles', component: UserProfilesComponent },
    { path: 'users', component: UsersComponent },

    { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../core/services/user.service';
import { User } from '../core/interfaces/user.interface';
import { UserProfileService } from '../core/services/user-profile.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../user-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    UserDialogComponent,
    ConfirmDialogComponent
  ]
})

export class UsersComponent implements OnInit {
  users: User[] = [];
  description: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.users = users;
      this.setProfileDescriptions();
    });
  }

  setProfileDescriptions(): void {
    this.users.forEach(user => {
      user.profileDescriptions = user.profiles.map(profile => profile.description).join(', ');
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: { user: { name: '', profiles: [] }, editMode: false }
    });
  
    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (result: User | undefined) => {
        if (result) {
          try {
            this.userService.createUser(result).subscribe(
              () => {},
              error => {
                console.error('Error creating user:', error);
                console.log('User data:', result);
              }
            );
          } catch (error) {
            console.error('An error occurred while creating user:', error);
          }
        }
      }
    });
  }
  

  editUser(userToEdit: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: { user: Object.assign({}, userToEdit), editMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result.id, result).subscribe(
          () => {},
          error => {
            console.error('Error updating user:', error);
          }
        );
      }
    });
  }

  confirmDeleteUser(userId: number): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação de Exclusão',
        message: 'Você tem certeza que deseja excluir este usuário?'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {},
          error => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }
}
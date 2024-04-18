import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { User, UserProfile } from '../core/interfaces/user.interface';
import { UserProfileService } from '../core/services/user-profile.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-dialog',
  template: `
  <h2 mat-dialog-title>{{ data.editMode ? 'Editar Usuário' : 'Adicionar Usuário' }}</h2>
  <mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>Nome</mat-label>
      <input matInput [(ngModel)]="data.user.name">
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Perfis</mat-label>
      <mat-select [(ngModel)]="selectedProfileIds" multiple>
        <mat-option *ngFor="let profile of availableProfiles" [value]="profile.id">
          {{ profile.description }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button (click)="save()">Salvar</button>
  </mat-dialog-actions>
`,

  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule],
  standalone: true
})
export class UserDialogComponent implements OnInit {
  availableProfiles: UserProfile[] = [];
  selectedProfileIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, editMode: boolean },
    private userService: UserService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfiles().subscribe(
      profiles => this.availableProfiles = profiles,
      error => console.error(error)
    );
    if (this.data.user && this.data.user.profiles) {
      this.selectedProfileIds = this.data.user.profiles.map(p => p.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {

    const profilesPayload: UserProfile[] = this.availableProfiles
      .filter(profile => this.selectedProfileIds.includes(profile.id));

 
    const userPayload: User = {
      ...this.data.user,
      profiles: profilesPayload
    };


    if (this.data.editMode) {
    
      if (typeof userPayload.id !== 'undefined') {
  
        this.userService.updateUser(userPayload.id, userPayload).subscribe({
          next: updatedUser => {
           
            this.dialogRef.close(updatedUser);
          },
          error: err => {
           
            console.error('Error updating user:', err);
          }
        });
      } else {
        console.error('Error: User ID is undefined.');
      }
    } else {
    
      this.userService.createUser(userPayload).subscribe({
        next: newUser => {
        
          this.dialogRef.close(newUser);
        },
        error: err => {
        
          console.error('Error creating new user:', err);
        }
      });
    }
  }
}
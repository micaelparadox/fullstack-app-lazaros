import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../core/services/user-profile.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule]
})
export class UserProfilesComponent {
  userProfiles: any[] = [];

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userProfileService.getUserProfiles().subscribe(
      profiles => this.userProfiles = profiles,
      error => console.error(error)
    );
  }
}

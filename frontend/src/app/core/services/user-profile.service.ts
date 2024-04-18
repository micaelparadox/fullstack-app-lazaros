import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrlUserProfiles = 'http://localhost:8080/api/userprofiles';
  private userProfilesSubject = new BehaviorSubject<any[]>([]);
  public userProfiles$ = this.userProfilesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialProfiles();
  }

  private loadInitialProfiles(): void {
    this.getUserProfiles().subscribe(profiles => {
      this.userProfilesSubject.next(profiles);
    });
  }

  getUserProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUserProfiles);
  }

  createUserProfile(description: string): Observable<any> {
    return this.http.post<any>(this.apiUrlUserProfiles, { description }).pipe(
      map(newProfile => {
        const profiles = this.userProfilesSubject.getValue();
        this.userProfilesSubject.next([...profiles, newProfile]);
        return newProfile;
      })
    );
  }

  updateUserProfile(id: number, description: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUserProfiles}/${id}`, { description }).pipe(
      map(updatedProfile => {
        const profiles = this.userProfilesSubject.getValue();
        const index = profiles.findIndex(profile => profile.id === id);
        if (index !== -1) {
          profiles[index] = updatedProfile;
        } else {
          profiles.push(updatedProfile);
        }
        this.userProfilesSubject.next(profiles);
        return updatedProfile;
      })
    );
  }

  deleteUserProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUserProfiles}/${id}`).pipe(
      map(() => {
        const profiles = this.userProfilesSubject.getValue().filter(profile => profile.id !== id);
        this.userProfilesSubject.next(profiles);
      })
    );
  }
}

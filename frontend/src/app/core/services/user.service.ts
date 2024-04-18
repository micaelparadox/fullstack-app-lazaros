import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlUsers = 'http://localhost:8080/api/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getUsers().subscribe(users => this.usersSubject.next(users));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }

  createUser(user: User): Observable<User[]> {
    return this.http.post<User>(this.apiUrlUsers, user).pipe(
      switchMap((newUser: User) => {
        return this.getUsers().pipe(
          switchMap((users: User[]) => {
            this.usersSubject.next(users);
            return of([newUser]); // Retorna um array com o novo usuário
          })
        );
      })
    );
  }
  
  
  

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${id}`, user).pipe(
      switchMap(updatedUser => {
        return this.getUsers().pipe(
          switchMap(users => {
            this.usersSubject.next(users);
            return [updatedUser]; // Change this line to return an array with the updated user
          })
        );
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUsers}/${id}`).pipe(
      switchMap(() => this.getUsers()),
      switchMap(users => {
        this.usersSubject.next(users);
        return []; // Change this line to return an empty array
      })
    );
  }
}

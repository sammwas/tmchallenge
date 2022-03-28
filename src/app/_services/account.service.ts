import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<string>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const userToken = response;
        if (userToken) {
          localStorage.setItem('token', JSON.stringify(userToken));
          this.currentUserSource.next(userToken);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map((response: User) => {
        if (response) {
          localStorage.setItem('token', JSON.stringify(response.token));
          this.currentUserSource.next(response.token);
        }
      })
    );
  }
  setCurrentUser(token) {
    this.currentUserSource.next(token);
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }
}

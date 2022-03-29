import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Member } from '../_models/member';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))?.token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((response: any) => {
        if (response) {
          let members: Member[] = [];
          let users: any[] = Array.from(response.data);
          users.forEach((x) => {
            members.push(
              new Member(x.id, x.email, x.first_name, x.last_name, x.avatar)
            );
          });
          return members;
        }
      })
    );
  }
  getMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'users/' + id).pipe(
      map((response: any) => {
        if (response) {
          const user = response.data;
          const member = new Member(
            user.id,
            user.email,
            user.first_name,
            user.last_name,
            user.avatar
          );
          return member;
        }
      })
    );
  }
  editMember(id: number, model: any) {
    return this.http.put(this.baseUrl + 'users/' + id, model, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
  deleteMember(id: number) {
    return this.http.delete(this.baseUrl + id, httpOptions);
  }
}

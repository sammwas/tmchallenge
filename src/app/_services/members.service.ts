import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getMembers(page?: number) {
    let params = new HttpParams();

    if (page !== null) {
      params = params.append('page', page.toString());
    }

    return this.http
      .get<Member[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response: any) => {
          if (response) {
            let appMembers = [];
            let users: any[] = Array.from(response.body.data);
            users.forEach((x) => {
              appMembers.push(
                new Member(x.id, x.email, x.first_name, x.last_name, x.avatar)
              );
            });
            this.paginatedResult.result = appMembers;
            return this.paginatedResult.result;
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

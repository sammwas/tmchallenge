import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let userToken: any;

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (userToken = user));
    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken.token}`,
        },
      });
    }
    return next.handle(request);
  }
}

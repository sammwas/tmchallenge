import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'topup-mama';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    this.accountService.setCurrentUser(userToken);
  }
}

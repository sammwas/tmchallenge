import { HttpClient } from '@angular/common/http';
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
  userlocation = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.getUserLocation();
  }
  setCurrentUser() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    this.accountService.setCurrentUser(userToken);
  }
  getUserLocation() {
    this.accountService.getUserLocation().subscribe((response: any) => {
      this.userlocation = {
        location: response.locality,
        country: response.countryCode,
      };
    });
  }
}

import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  loginMode = false;
  homeMode = true;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
  registerToggle() {
    this.registerMode = !this.registerMode;
    this.loginMode = false;
    this.homeMode = false;
  }
  loginToggle() {
    this.loginMode = !this.registerMode;
    this.registerMode = false;
    this.homeMode = false;
  }
  cancelRegisterMode(mode) {
    this.registerMode = mode;
    this.homeMode = true;
  }
}

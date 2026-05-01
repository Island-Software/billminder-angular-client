import { Component, OnInit } from '@angular/core';
import { LoginUser } from './models/login-user';
import { AccountService } from './services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Billminder';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {   
    this.setCurrentUser();
  }

  setCurrentUser() {
    // Added the "!" to avoid an error. Assuming that will never return null
    const user: LoginUser = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }  
}

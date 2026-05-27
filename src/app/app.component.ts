import { Component, OnInit } from '@angular/core';
import { LoginUser } from './models/login-user';
import { AccountService } from './services/account.service';
import { NavComponent } from './core/nav/nav.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
    selector: 'app-root',
    imports: [NavComponent, RouterModule, BsDropdownModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
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

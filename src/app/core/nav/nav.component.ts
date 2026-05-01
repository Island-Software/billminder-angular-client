import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: false
})
export class NavComponent implements OnInit {
  model: any = {}
  isMenuCollapsed: boolean = true;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/bills');
      this.closeMenu();
    });
  }

  logout() {
    this.accountService.logout();    
    this.router.navigateByUrl('/home').then(_ => {
      // Needed to show the login fields on navbar   
      window.location.reload();
    });    
  }

  closeMenu() {
    this.isMenuCollapsed = true;
  }
}

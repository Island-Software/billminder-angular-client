import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-nav',
    imports: [NgbModule, CommonModule, BsDropdownModule, FormsModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
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

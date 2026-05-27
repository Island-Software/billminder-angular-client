// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  
  // Triggered by an emmiter on child component
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}

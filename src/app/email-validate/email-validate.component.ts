import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-email-validated',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css']
})
export class EmailValidateComponent implements OnInit {
  validated: boolean = false;
  error: boolean = false;

  constructor(public accountService: AccountService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        var email = params.email;
        var emailToken = params.emailToken;
        
        this.accountService.validateEmail(email, emailToken)
          .subscribe(response => {
            this.validated = true;
            console.log(response);
            
          }, error => {
            this.error = true;
            console.log("Error:", error);
          });
      });    
  }
}

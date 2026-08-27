import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from '@iqx-limited/ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {    
      
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (state.url.startsWith('/validated'))
          return true;

        if (user) 
          return true;
        
        this.toastr.error('You shall not pass!');
        return false;
      })
    )
  }
  
}

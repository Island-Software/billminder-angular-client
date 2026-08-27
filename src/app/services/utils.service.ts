import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { CopyBillDto } from "../models/bill";
import { switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "./users.service";
import { AccountService } from "./account.service";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  baseUrl = environment.apiUrl;
  userName: string = '';
  copyBillsValues: boolean = false;

  constructor(private usersService: UsersService, private http: HttpClient, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.userName = user.username;
      }
    });
  }

  copyBills(currentMonth: number, currentYear: number) {
    return this.usersService.getUser(this.userName).pipe(
      switchMap(apiUser => {
            const copyBillDTO: CopyBillDto = {
                userId: this.usersService.getCurrentUserId(),
                currentMonth,
                currentYear,
                copyValues: apiUser.copyBillsValues
            };

            return this.http.post(
                this.baseUrl + 'utils/copy',
                copyBillDTO
            );
      })
    );
  }
}
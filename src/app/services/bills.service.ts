import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Bill, CopyBillDto, NewBillDto, UpdateBillDto } from '../models/bill';
import { PaginatedResult } from '../models/pagination';
import { UsersService } from './users.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Bill[]> = new PaginatedResult<Bill[]>();
  userName: string = '';  

  constructor(private http: HttpClient, private usersService: UsersService, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.userName = user.username;
      }
    });
  }

  getBills(username: string, month: number, year: number, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== undefined && itemsPerPage !== undefined) {
      params = params.append('pageNumber', page!.toString());
      params = params.append('pageSize', itemsPerPage!.toString());
    }

    return this.http.get<Bill[]>(this.baseUrl + 'bills/name/' + username + '/' + month + '/' + year, { observe: 'response', params }).pipe(
      map(response => {

        this.paginatedResult.result = response.body!;
        this.paginatedResult.result.map(r => {
          if (r.dueDate != undefined)
            r.dueDate = new Date(r.dueDate);
          r.selected = false;
        });
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }

        return this.paginatedResult;
      })
    );
  }

  createBill(bill: NewBillDto) {
    bill.userId = this.usersService.getCurrentUserId();
    return this.http.post(this.baseUrl + 'bills/create', bill);
  }

  updateBill(bill: UpdateBillDto) {
    return this.http.put(this.baseUrl + 'bills/' + bill.id, bill);
  }

  delete(bill: Bill) {
    return this.http.delete(this.baseUrl + 'bills/' + bill.id);
  }
}

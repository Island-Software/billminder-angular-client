import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../models/pagination';
import { CopyReceivingDto, NewReceivingDto, Receiving, UpdateReceivingDto } from '../models/receiving';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Receiving[]> = new PaginatedResult<Receiving[]>();

  constructor(private http: HttpClient, private usersService: UsersService) { }

  get(username: string, month: number, year: number, page?: number, itemsPerPage?: number) {    
    let params = new HttpParams();

    if (page !== undefined && itemsPerPage !== undefined) {
      params = params.append('pageNumber', page!.toString());
      params = params.append('pageSize', itemsPerPage!.toString());
    }

    return this.http.get<Receiving[]>(this.baseUrl + 'receivings/name/' + username + '/' + month + '/' + year, {observe: 'response', params}).pipe(
      map(response => {       
        this.paginatedResult.result = response.body!;
        this.paginatedResult.result.map(r => {
          if (r.receivedDate != undefined)
            r.receivedDate = new Date(r.receivedDate);
          r.selected = false;
        });
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        return this.paginatedResult;
      })
    );    
  }

  create(receiving: NewReceivingDto) {
    receiving.userId = this.usersService.getCurrentUserId();    
    return this.http.post(this.baseUrl + 'receivings/', receiving);
  }

  update(receiving: UpdateReceivingDto) {
    return this.http.put(this.baseUrl + 'receivings/' + receiving.id, receiving);
  }

  delete(receiving: Receiving) {
    return this.http.delete(this.baseUrl + 'receivings/' + receiving.id);
  }  

  copy(currentMonth: number, currentYear: number)
  {
    let copyBillDTO: CopyReceivingDto = { 
      userId: this.usersService.getCurrentUserId(), currentMonth: currentMonth, currentYear: currentYear };
    
    return this.http.post(this.baseUrl + 'receivings/copy', copyBillDTO);
  }
}

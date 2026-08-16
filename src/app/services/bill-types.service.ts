import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BillType } from '../models/bill-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillTypesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBillType(id: number): Observable<BillType> {
    return this.http.get<BillType>(this.baseUrl + 'billtype/' + id);
  }

  getBillTypes(): Observable<BillType[]> {
    return this.http.get<BillType[]>(this.baseUrl + 'billtype');
  }

  createBillType(billType: BillType) {
    return this.http.post(this.baseUrl + 'billtype/create', billType);
  }

  deleteBillType(billType: BillType) {
    return this.http.delete(this.baseUrl + 'billtype/' + billType.id);
  }

  updateBillType(billType: BillType) {
    return this.http.put(this.baseUrl + 'billtype/' + billType.id, billType);
  }
}

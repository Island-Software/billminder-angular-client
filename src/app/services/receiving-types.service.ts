import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ReceivingType} from '../models/receiving-type';

@Injectable({
  providedIn: 'root'
})
export class ReceivingTypesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReceivingType(id: number): Observable<ReceivingType> {
    return this.http.get<ReceivingType>(this.baseUrl + 'receivingtype/' + id);
  }

  getReceivingTypes(): Observable<ReceivingType[]> {
    return this.http.get<ReceivingType[]>(this.baseUrl + 'receivingtype');
  }

  createReceivingType(ReceivingType: ReceivingType) {
    return this.http.post(this.baseUrl + 'receivingtype/', ReceivingType);
  }

  deleteReceivingType(ReceivingType: ReceivingType) {
    return this.http.delete(this.baseUrl + 'receivingtype/' + ReceivingType.id);
  }

  updateReceivingType(ReceivingType: ReceivingType) {
    return this.http.put(this.baseUrl + 'receivingtype/' + ReceivingType.id, ReceivingType);
  }
}

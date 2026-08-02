import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User, UserEdit } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(username: string) {
    return this.http.get<UserEdit>(this.baseUrl + 'users/name/' + username);
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('user')!).userId;
  }

  getCurrentUserName() {
    return JSON.parse(localStorage.getItem('user')!).username;
  }

  update(id: number, user: any) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginModel } from '../_models/login.model';
import { User } from '../_models/user.model';
import { SignUpModel } from '../_models/signUp.model';
import { TokenValues } from '../_models/token-values';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  private baseUrl = "http://mahmoudslama-001-site3.dtempurl.com/api/Identity/";
  private developmentUrl = this.baseUrl;//"https://localhost:44371/api/Identity";

  constructor(private http: HttpClient) { }

  signIn(user: LoginModel) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(user);
    return this.http.post(`${this.developmentUrl}/login`, user, { headers: headers });
  }

  signUp(user: SignUpModel) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.developmentUrl}`, user, { headers: headers });
  }

  getUserById(userId: number) {
    const token = JSON.parse(localStorage.getItem(TokenValues.Token));
    const headers = new HttpHeaders(
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      });

    return this.http.get(`${this.developmentUrl}/${userId}`, { headers: headers });
  }

  updateUserById(user) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem(TokenValues.Token))
      });
    return this.http.patch(this.developmentUrl, user, { headers: headers });
  }

  isLoggedIn() {
    let token = JSON.parse(localStorage.getItem(TokenValues.Token));
    let userId = JSON.parse(localStorage.getItem(TokenValues.UserId));

    if ((token == null || token == undefined) && (userId == null || userId == undefined)) {
      return false;
    }
    return true;
  }

  logOut() {
    console.log("logOut");
    localStorage.clear();
  }
}

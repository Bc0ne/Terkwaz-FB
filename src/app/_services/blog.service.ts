import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { TokenValues } from '../_models/token-values';
import { BlogInputModel } from '../_models/blog.mode';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = "http://mahmoudslama-001-site3.dtempurl.com/api/blogs";
  private developmentUrl = this.baseUrl;//"https://localhost:44371/api/blogs";

  constructor(private http: HttpClient) { }

  getAllBlogs() {
    const token = JSON.parse(localStorage.getItem(TokenValues.Token));
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ token
    });
   
    return this.http.get(this.developmentUrl, { headers: headers });
  }

  addNewBlog(blog: BlogInputModel) {
    const token = JSON.parse(localStorage.getItem(TokenValues.Token));
    const headers = new HttpHeaders(
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      });

    return this.http.post(this.developmentUrl, blog, { headers: headers });
  }
}

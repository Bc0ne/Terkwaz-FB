import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { TokenValues } from '../_models/token-values';
import { BlogInputModel } from '../_models/blog.mode';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = "http://mahmoudslama-001-site1.dtempurl.com/api/Identity/";
  private developmentUrl = "https://localhost:44371/api/blogs";

  constructor(private http: HttpClient) { }

  getAllBlogs() {
    const token = JSON.parse(localStorage.getItem(TokenValues.Token));
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.developmentUrl, { headers: headers });
  }

  addNewBlog(blog: BlogInputModel) {
    const token = JSON.parse(localStorage.getItem(TokenValues.Token));
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      });

    return this.http.post(this.developmentUrl, blog, { headers: headers });
  }
}

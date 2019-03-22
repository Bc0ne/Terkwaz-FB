import { Component, OnInit, TemplateRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { BlogService } from '../_services/blog.service';
import { BlogInputModel } from '../_models/blog.mode';
import { UserService } from '../_services/user-service.service';
import { User } from '../_models/user.model';
import { TokenValues } from '../_models/token-values';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;
  blogsNotification: any[] = [];
  blogs: any[] = [];
  newBlog: BlogInputModel;
  constructor(private userService: UserService,
    private blogService: BlogService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUser();
    this.startNotificationConnection();
    this.getAllBlogs();
  }

  startNotificationConnection() {
    let connection = new HubConnectionBuilder().withUrl("http://mahmoudslama-001-site3.dtempurl.com/notify").build();

    connection.on("BroadcastNotification", (data) => {
      this.blogsNotification.push(data);
      this.getAllBlogs();
    });

    connection.start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error while establishing the connection."));
  }

  getUser() {
    const userId = JSON.parse(localStorage.getItem(TokenValues.UserId));
    this.userService.user = new User();
    this.userService.getUserById(userId).subscribe((data: any) => {
      this.userService.user.fullName = data.fullName;
      this.userService.user.email = data.email;
      this.userService.user.photoUrl = data.photoUrl;
    });
  }


  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe((data: any) => {
      this.blogs = data;
    }, err => console.log(err));
  }

  addNewBlog() {
    if (this.newBlog) {
      this.blogService.addNewBlog(this.newBlog).subscribe((data: any) => {
        this.modalRef.hide();
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.newBlog = new BlogInputModel();
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.newBlog = null;
    this.modalRef.hide();
  }

  logOut() {
    this.router.navigate(["/login"]);
    this.userService.logOut();
  }
}

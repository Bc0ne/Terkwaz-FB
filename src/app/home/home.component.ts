import { Component, OnInit, TemplateRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BlogService } from '../_services/blog.service';
import { BlogInputModel } from '../_models/blog.mode';

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
  constructor(private blogService: BlogService, private modalService: BsModalService) { }

  ngOnInit() {

    this.blogService.getAllBlogs().subscribe((data: any) => {
      this.blogs = data;
      console.log(data);
    }, err => console.log(err));

    let connection = new HubConnectionBuilder().withUrl("https://localhost:44371/notify").build();

    connection.on("BroadcastNotification", (data) => {
      console.log(data);
      this.blogsNotification.push(data);
    });

    connection.start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error while establishing the connection."));
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



}

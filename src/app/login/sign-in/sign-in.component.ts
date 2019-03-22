import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginModel } from '../../_models/login.model';
import { UserService } from '../../_services/user-service.service';
import { User } from '../../_models/user.model';
import { TokenValues } from 'src/app/_models/token-values';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  login: LoginModel = new LoginModel();

  errorMessage: string;
  @Output() onLoginSucceed = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.user = new User();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      rememberMe: false
    });
  }

  signIn(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.dirty) {

        const user = { ...this.login, ...this.loginForm.value }
        delete user.rememberMe;
        this.userService.signIn(user).subscribe(

          user => this.onLoginSuccess(user),
          error => {
            this.errorMessage = error.error.message;
          }
        );
      }
    }
  }

  onLoginSuccess(user): void {
    console.log(user);
    this.userService.user.fullName = user.fullName;
    this.userService.user.email = user.email;
    this.userService.user.photoUrl = user.photoUrl;
    console.log(user.token);
    localStorage.setItem(TokenValues.Token, JSON.stringify(user.token));
    localStorage.setItem(TokenValues.UserId, JSON.stringify(user.userId));
    //this.onLoginSucceed.emit(null);
    this.router.navigate(['/home']);
  }
}

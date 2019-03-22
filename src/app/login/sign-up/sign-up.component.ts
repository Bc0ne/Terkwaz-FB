import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpModel } from '../../_models/signUp.model';
import { UserService } from '../../_services/user-service.service';
import { TokenValues } from 'src/app/_models/token-values';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  signUpModel: SignUpModel = new SignUpModel();
  @Output() onSignUpSucceed = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      photoUrl: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    })
  }


  signUp(): void {
    if (this.signUpForm.valid) {
      if (this.signUpForm.dirty) {
        const user = { ...this.signUpModel, ...this.signUpForm.value };
        this.userService.signUp(user).subscribe(
          result => this.onSuccess(result),
          error => console.log("error")
        );
      }
    }
  }

  onSuccess(user){
    this.userService.user.fullName = user.fullName;
    this.userService.user.email = user.email;
    this.userService.user.photoUrl = user.photoUrl;
    localStorage.setItem(TokenValues.Token, JSON.stringify(user.token));
    localStorage.setItem(TokenValues.UserId, JSON.stringify(user.userId));
    this.onSignUpSucceed.emit(null);
    this.router.navigate(['/home']);
  }

}

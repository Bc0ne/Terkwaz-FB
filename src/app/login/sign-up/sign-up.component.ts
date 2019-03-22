import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpModel } from '../../_models/signUp.model';
import { UserService } from '../../_services/user-service.service';

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
    console.log("Created");
    this.onSignUpSucceed.emit(null);
    console.log(user);
    this.router.navigate(['/home']);
  }

}

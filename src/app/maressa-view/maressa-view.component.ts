import { LogInService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { LoggedUser } from '../objects/loggeduser';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-maressa-view',
  templateUrl: './maressa-view.component.html',
  styleUrls: ['./maressa-view.component.css']
})

export class MaressaViewComponent implements OnInit {
  loginForm: FormGroup;
  private username: string;
  loading = false;
  submitted = false;
  private responseUser: LoggedUser;
  private badLogIn = false;

  constructor(private formBuilder: FormBuilder, private loginService: LogInService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    //this.loading = true; Really don't need this while testing
    //////////////////////////////////////////////////////////
    //console.log("Value:" + this.loginForm.get('username').value);
    this.username = this.loginForm.get('username').value;
    //console.log("Value:" + this.loginForm.get('password').value);
    this.loginService.getUser(this.username).subscribe(
      userResponse => {
      if (userResponse) {
        this.badLogIn = false;
        this.responseUser = userResponse;
        console.log("Retrieved User");
        console.log(userResponse.id);
        console.log("User's Username: " + userResponse.username);
        console.log("User's Password: " + userResponse.password);
        this.logIn();
      }
      else {
        this.badLogIn = true;
        console.log("BAD LOGIN");
      }
      });

  }

  logIn(): boolean {
    console.log("IN LOGIN FUNCTION");
    if (this.responseUser.username == this.loginForm.get('username').value) {
      console.log("MATCHING USERNAME'S");
      if (this.responseUser.password == this.loginForm.get('password').value) {
        sessionStorage.setItem('isLoggedIn', "true");
        console.log("SETTING SESSION STORAGE");
        sessionStorage.setItem('userID', this.responseUser.id.toString());
        sessionStorage.setItem('username', this.responseUser.username.toString());
        window.location.href = '/recipe';
        return true;
      }
    } else {
      return false;
    }
  }





}
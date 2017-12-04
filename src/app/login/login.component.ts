import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

declare let Materialize: any;
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    $(function () {
      Materialize.updateTextFields();
    });
  }

  login() {
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(result => {
          if (result === true) {
            localStorage.setItem('username', this.user.username);
            location.replace('/');
          }
        },
        error => {
          this.error = error['error']['error_description'];
        }
      );
  }
}

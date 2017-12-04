import {Component, Injectable} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = localStorage.getItem('username');

  static logoutStatic() {
    AuthenticationService.clearLocalStorage();
    location.replace('/login');
  }

  logout() {
    AppComponent.logoutStatic();
  }
}

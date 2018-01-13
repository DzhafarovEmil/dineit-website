import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Food} from '../models/food';
import {SuccessListener} from '../listener';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import {FoodCompany} from "../models/food.company";

@Injectable()
export class FoodService {
  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.params = this.params.set('access_token', localStorage.getItem(AuthenticationService.tokenName));
    this.rootApi = this.authService.apiRoot;
  }

  private headers = new HttpHeaders();
  private params = new HttpParams();
  private rootApi: string;

  deleteFood(food: Food, listener: SuccessListener<Food>) {
    this.http.delete(this.rootApi + '/api/food/' + food.id,
      {params: this.params})
      .subscribe(next => {
          if (next === food.id) {
            listener.success(food);
          }
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            alert('access token has been expired');
            location.replace('/login');
            // update access token
          }
        }
      );
  }

  editFood(food: Food, listener: SuccessListener<Food>) {
    this.http.put(this.rootApi + '/api/food/' + food.id, food,
      {headers: this.headers, params: this.params})
      .subscribe(
        (resp: number) => {
          if (resp === food.id) {
            listener.success(food);
          }
        },
        error => {
          if (error.status === 401) {
            alert('access token has been expired');
            location.replace('/login');
            // update access token
          }
        }
      );
  }

  addFood(food: Food, listener: SuccessListener<Food>) {
    return this.http.post(this.rootApi + '/api/food/', JSON.stringify(food),
      {params: this.params, headers: this.headers})
      .subscribe(
        (success: number) => {
          food.id = success;
          listener.success(food);
        },
        error => {
          if (error.status === 401) {
            alert('access token has been expired');
            location.replace('/login');
            // update access token
          }
        }
      );
  }

  getFoods(): Observable<Food[]> {
    return this.http.get(this.rootApi + '/api/food', {params: this.params})
      .map((response: Food[]) => {
        return response;
      }).catch(
        error => {
          if (error.status === 401) {
            alert('access token has been expired');
            location.replace('/login');
            // update access token
          } else {
            return Observable.throw(error);
          }
        }
      );
  }
}


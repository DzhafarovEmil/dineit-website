import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {FoodCompany} from '../models/food.company';
import {SuccessListener} from '../listener';
import {OperationListener} from "../settings/OperationListener";


@Injectable()
export class FoodCompanyService {
  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.params = this.params.set('access_token', localStorage.getItem(AuthenticationService.tokenName));
    this.rootApi = this.authService.apiRoot;
  }

  private headers = new HttpHeaders();
  private params = new HttpParams();
  private rootApi: string;

  addNewCompany(foodCompany: FoodCompany, listener: SuccessListener<FoodCompany>) {
    return this.http.post(this.rootApi + '/register-food-company/', foodCompany,
      {headers: this.headers})
      .subscribe(
        (resp: number) => {
          foodCompany.id = resp;
          listener.success(foodCompany);
        },
        error => {
          if (error.status === 401) {
            // update access token
          }
        }
      );
  }

  deleteFoodCompany(foodCompany: FoodCompany, listener: SuccessListener<FoodCompany>) {
    this.http.delete(this.rootApi + '/api/food-company/' + foodCompany.id,
      {headers: this.headers, params: this.params})
      .subscribe((resp: number) => {
          if (resp === foodCompany.id) {
            listener.success(foodCompany);
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

  editFoodCompany(foodCompany: FoodCompany, listener: SuccessListener<FoodCompany>) {
    this.http.put(this.rootApi + '/api/food-company/' + foodCompany.id, foodCompany,
      {headers: this.headers, params: this.params})
      .subscribe(
        (resp: number) => {
          if (resp === foodCompany.id) {
            listener.success(foodCompany);
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

  findByUsername(username: string): Observable<FoodCompany> {
    return this.http.get(this.rootApi + '/api/food-company/' + username, {headers: this.headers, params: this.params})
      .map((foodCompany: FoodCompany) => {
        return foodCompany;
      }).catch(error => {
        return Observable.throw(error);
      });
  }

  changePassword(currentPassword: string, newPassword: string, listener: OperationListener<number>) {
    return this.http.get(this.rootApi + '/food-company/change-password',
      {
        headers: this.headers,
        params: this.params.set('currentPassword', currentPassword).set('newPassword', newPassword)
      })
      .subscribe(
        (resp: HttpResponse<number>) => {
          listener.success(resp.body);
        },
        (error: HttpResponse<number>) => {
          if (error.status === 401) {
            // update access token
          }

          if (error.status === 403) {
            listener.error('Wrong password');
          }

          if (error.status === 404) {
            listener.error('Company not found');
          }

          if (error.status === 400) {
            listener.error('Bsd password');
          }
        }
      );
  }
}

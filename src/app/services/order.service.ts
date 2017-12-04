import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SuccessListener} from '../listener';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import {Order} from '../models/order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.params = this.params.set('access_token', localStorage.getItem(AuthenticationService.tokenName));
    this.rootApi = this.authService.apiRoot;
  }

  private headers = new HttpHeaders();
  private params = new HttpParams();
  private rootApi: string;

  deleteOrder(order: Order, listener: SuccessListener<Order>) {
    this.params = this.params.set('user', 'food-company');
    this.http.delete(this.rootApi + '/api/order/' + order.id,
      {params: this.params})
      .subscribe((resp: number) => {
          if (resp === order.id) {
            listener.success(order);
          }
        },
        error => {
          if (error.status === 401) {
            // update access token
          }
        }
      );
  }

  editOrder(order: Order, listener: SuccessListener<Order>) {
    this.http.put(this.rootApi + '/api/order/' + order.id, order,
      {headers: this.headers, params: this.params})
      .subscribe(
        (resp: number) => {
          if (resp === order.id) {
            listener.success(order);
          }
        },
        error => {
          if (error.status === 401) {
            // update access token
          }
        }
      );
  }

  getOrders(): Observable<Order[]> {
    this.params = this.params.set('user', 'food-company');

    return this.http.get(this.rootApi + '/api/order', {params: this.params})
      .map((response: Order[]) => {
        return response;
      }).catch(
        error => {
          if (error.status === 401) {
            // update access token
          } else {
            return Observable.throw(error);
          }
        }
      );
  }
}


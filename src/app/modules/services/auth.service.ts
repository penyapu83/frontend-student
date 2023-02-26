import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { from as fromPromise,Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIURL = environment.baseURL;
  isLoggedIn = false;
  me:any;

 
  constructor(public httpClient: HttpClient) { this.httpClient = httpClient; }

  login(param:any): Observable<any> {
    return this.httpClient.post(`${this.APIURL}login`,param)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }


  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}

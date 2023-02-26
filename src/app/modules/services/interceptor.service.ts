import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { throwError,BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router,private authService:AuthService) {}
  // https://medium.com/@monkov/angular-using-httpinterceptor-for-token-refreshing-3f04ea2ccb81
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    
    let re = "login";
    if (request.url.search(re) === -1) {
      //let user = JSON.parse(localStorage.getItem('user') ?? '') ;
      let token = JSON.parse(localStorage.getItem('token') ?? '').token;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      } 
    }
    
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(['/auth']);
          }else{
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(errorMessage);
          }
          
          
          return throwError(errorMessage);
        })
      )
  }
   

    
}
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { from as fromPromise,Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private APIURL = environment.baseURL;
  isLoggedIn = false;
  me:any;

 
  constructor(public httpClient: HttpClient) { this.httpClient = httpClient; }
  
  getProfile(id:number): Observable<any> {
    return this.httpClient.get(`${this.APIURL}student/findStudentById/${id}`)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  delete(id:number): Observable<any> {
    return this.httpClient.delete(`${this.APIURL}student/delete/${id}`)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  getProfileList(): Observable<any> {
    return this.httpClient.get(`${this.APIURL}student/findAllStudent`)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  getProfileListByCourseId(courseId:number): Observable<any> {
    return this.httpClient.get(`${this.APIURL}student/findStudentByCourseId/${courseId}`)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  

  getCourseList(): Observable<any> {
    return this.httpClient.get(`${this.APIURL}student/findAllCourse`)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  saveProfile(param:any): Observable<any> {
    return this.httpClient.post(`${this.APIURL}student/create`,param)
    .pipe(
      catchError((err => {
        return this.handleError(err);
      })
    ));
  }

  update(param:any,id:number): Observable<any> {
    console.log(param);
    console.log(id);
    return this.httpClient.put(`${this.APIURL}student/update/${id}`,param)
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

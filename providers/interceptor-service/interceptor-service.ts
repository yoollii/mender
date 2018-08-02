import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { StorageServiceProvider } from '../storage-service/storage-service';
@Injectable()
export class InterceptorServiceProvider {
  token:string;
  constructor(public http: HttpClient,private storageService:StorageServiceProvider) {
    
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const token = this.storageService.read('jwt_token');
    const authReq = req.clone({
       headers:req.headers.set('Authorization',token)
    });
 
    return next.handle(authReq).pipe(mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status != 200) {
          return ErrorObservable.create(event);
        }
        return Observable.create(observer => observer.next(event)); //请求成功返回响应
      }),
      catchError((res: HttpResponse<any>) => {   //请求失败处理
        switch (res.status) {
          case 401:
            break;
          case 200:
            console.log('业务错误');
            break;
          case 404:
            break;
          case 403:
            console.log('业务错误');
            break;
        }
        return ErrorObservable.create(event);
      }));
  }
}

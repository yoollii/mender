import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent,HttpHandler,HttpRequest,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { StorageServiceProvider } from '../storage-service/storage-service';

@Injectable()
export class InterceptorServiceProvider {
  token:string;
  constructor(
    public http: HttpClient,
    private storageService:StorageServiceProvider,
  ) {
    
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const user = this.storageService.read('user');
    let token ="";
    if(user){
      token = user['token'];
    }
    const authReq = req.clone({
       headers:req.headers.set('Authorization',token)
    });
 
    return next.handle(authReq).pipe(mergeMap((event: any) => {
        if (event instanceof HttpResponse &&event.status==200&& event.body['result'] != '0000') {
          return ErrorObservable.create(event);
        }
        return Observable.create(observer => observer.next(event)); //请求成功返回响应
      }),
      catchError((res: HttpResponse<any>) => {   //请求失败处理
        return ErrorObservable.create(res);
      }));
  }
}

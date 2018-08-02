import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInfoProvider {
  //向用户展示的错误提示信息
  syserror = '系统错出';
  reqError = "请求出错";
  constructor(public http: HttpClient) {
 
  }

}

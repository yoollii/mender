import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { ErrorInfoProvider } from '../error-info/error-info';
import 'rxjs/add/operator/shareReplay';
@Injectable()
export class HttpServiceProvider {
  api;
  constructor(
    public config: AppConfig,
    private toastCtrl: ToastController,
    private httpClient: HttpClient,
    private app: App,
    private errorInfo:ErrorInfoProvider,
  ) {

  }
  public request(config: object) {
    let _config = {
      url: "",
      type: "post",
      data: {},
      success: "",
      fail: "",
      complete: ""
    };
    Object.assign(_config, config);
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const configErrors = this.checkRequestConfig(_config);
    if (configErrors.length > 0) {
      if (this.config.debug) {
        let str = configErrors.join("、");
        alert(str + "请求配置出错");
      } else {
        this.alertMsg(this.errorInfo.reqError);
      }
      return false;
    }
    const reqType = _config.type;
    switch (reqType.toLocaleLowerCase()) {
      case "get":
        let param = _config.data;
        let paramArr = [];
        for (const key in param) {
          let tmp = key + "=" + param[key];
          paramArr.push(tmp);
        }
        const params = new HttpParams({ fromString: paramArr.join("&") });
        this.get(_config.url, params, _config.success, _config.fail, _config.complete);
        break;
      case "post":
        this.post(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers);
        break;
      case "put":
        this.put(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers);
        break;
      case "delete":
         this.delete(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers);
        break;
      default:()=>{
        if(this.config.debug){
          alert('该请求方法不支持');
        }else{
          this.alertMsg(this.errorInfo.reqError)
        }
      }
    }

  }
  private checkRequestConfig(config) {
    let names = [];
    for (const key in config) {
      switch (key) {
        case "url":
          if (!config[key]) {
            names.push(key);
          }
          break;
        case "success":
          if (!config[key] || typeof config[key] != 'function') {
            names.push(key);
          }
 
          break;
        case "fail":
          if (config[key] && typeof config[key] != 'function') {
            names.push(key);
          }
  
          break;
        case "complete":
          if (config[key] && typeof config[key] != 'function') {
            names.push(key);
          }

          break;
      }
    }
    return names;
  }
  private post(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any) {
    this.httpClient.post(this.config.api + apiName,
      params, { headers })
      .subscribe(
        res => {//请求成功
         // this.responseSuccess(res, callback);
          callback(res['data']);
        },
        error => {//请求失败
          this.requestFailed(apiName, error);
        },
        () => {//请求完成
          
        });
  }
  private get(apiName: string, params: object, callback: any, fail: any, complete: any) {

    this.httpClient.get(this.config.api + apiName,
      params)
      .subscribe(
        (res) => {
          callback(res['data']);
        },
        error => {
          this.requestFailed(apiName, error);
        },
        () => {
         
        });
  }
  private put(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any) {
    this.httpClient.put(this.config.api + apiName,
    params,{ headers })
      .subscribe(
        (res) => {
          callback(res['data']);
        },
        error => {
          this.requestFailed(apiName, error);
        },
        () => {
          
        }
      );
  }
  private delete(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any) {
    this.httpClient.delete(this.config.api + apiName)
      .subscribe(
        (res) => {
          callback(res['data']);
        },
        error => {
          this.requestFailed(apiName, error);
        },
        () => {
          
        });
  }

  private requestFailed(apiName: string, err) {
    switch (err.status) {
      case 401:
        break;
      case 200://请求成功,响应结果不成功
        this.doResError(err.body.result,err.body['msg']);
        break;
      case 404:
        if(this.config.debug){
          alert('请求失败，未找到请求地址('+apiName+")");
        }else{
          this.alertMsg(this.errorInfo.syserror);
        }
        break;
      case 403:
        
        break;
      case 500:
        if(this.config.debug){
          alert('请求失败，服务器出错('+apiName+")");
        }else{
          this.alertMsg(this.errorInfo.syserror);
        }
        break;
      default:{
        if(this.config.debug){
          alert(JSON.stringify(err));
        }else{
          this.alertMsg(this.errorInfo.syserror);
        }
      }
    }
  }
  /**
   * 请求成功,但响应不成功的情况做处理
   * 1002 token过期  需要重新登录
   * @param code 
   */
  private doResError(code,msg){
    switch(code){
      case '1002':
      this.app.getRootNav().push(LoginPage);
      break;
      default:{
        if(this.config.debug){
          alert(msg+"("+code+")");
        }else{
          this.alertMsg(msg);
        }
      }
    }
  }
  private alertMsg(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'middle', // “top”，“middle”，“bottom”。
      duration: 3000
    });
    toast.present();
  }


}

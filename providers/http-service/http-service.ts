import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
@Injectable()
export class HttpServiceProvider {
  api;
  constructor(
    private config: AppConfig,
    private storage: Storage,
    private toastCtrl: ToastController,
    private httpClient: HttpClient,
    private app: App
  ) {
    
  }
  public post(apiName: string, params: object, callback: any) {
    this.httpClient.post(this.config.api + apiName,
      params)
      .subscribe(
        (res) => {
          console.log("POST call successful value returned in body",
            res);
          this.responseSuccess(res, callback);
        },
        error => {
          console.log("POST call in error", error);
          this.requestFailed(apiName, error);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }
  public get(apiName: string, params: object, callback: any) {

    this.httpClient.get(this.api + apiName,
      params)
      .subscribe(
        (res) => {
          console.log("POST call successful value returned in body",
            res);
          this.responseSuccess(res, callback);
        },
        error => {
          this.requestFailed(apiName, error);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  private responseSuccess(res: any, callback) {
    if (res.b !== 1) { // 失败
      if (res.msg) {
        this.alertMsg(res.msg);
      } else {
        const data = res.data;
        let errorMsg = '操作失败！';
        data.map(i => {
          errorMsg = i.errorMsg + '\n';
        });
        this.alertMsg(errorMsg);
      }
      if (res.i == 30003) {
        this.app.getRootNav().push(LoginPage);
      }
    } else {
      callback(res['o']);
    }
  }

  private requestFailed(url: string, err) {
    let msg = '请求发生异常';
    const status = err.status;
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    } else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    } else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    } else {
      msg = '未知错误，请检查网络';
    }
    return msg;

  }

  private alertMsg(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'top', // “top”，“middle”，“bottom”。
      duration: 3000
    });
    toast.present();
  }


}

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { ToastController, LoadingController, Platform } from 'ionic-angular';
import { App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { ErrorInfoProvider } from '../error-info/error-info';
import 'rxjs/add/operator/shareReplay';
@Injectable()
export class HttpServiceProvider {
  api;
  loading = [];
  loading_is_show = true;
  loading_text = "加载中...";
  n = 0;
  constructor(
    public config: AppConfig,
    private toastCtrl: ToastController,
    private httpClient: HttpClient,
    private app: App,
    private errorInfo: ErrorInfoProvider,
    private loadingCtrl: LoadingController,
    private plat: Platform
  ) {
    const pl = this.plat;
    this.plat.registerBackButtonAction(res => {
      this.n++;
      if (this.n < 2) {
        this.alertMsg('再次按返回键将退出程序');
      } else {
        pl.exitApp();
      }
    })
  }
  public request(config: object) {
    let _config = {
      url: "",
      type: "post",
      data: {},
      success: "",
      fail: "",
      complete: "",//在请求完成的方法没有执行，将传过完成需要执行的方法放分别放在成功和失败,待后期调试。
      loading: this.loading_is_show,
      loading_text: this.loading_text
    };
    Object.assign(_config, config);

    let loadObj = {
      "show": _config.loading,
      'text': _config.loading_text,
      'loading': ''
    }
    this.loading.push(loadObj);

    let loadIndex = this.loading.length - 1;
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
        this.get(_config.url, params, _config.success, _config.fail, _config.complete, loadIndex);
        break;
      case "post":
        this.post(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers, loadIndex);
        break;
      case "put":
        this.put(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers, loadIndex);
        break;
      case "delete":
        this.delete(_config.url, _config.data, _config.success, _config.fail, _config.complete, headers, loadIndex);
        break;
      default: () => {
        if (this.config.debug) {
          alert('该请求方法不支持');
        } else {
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
  private post(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any, loadIndex: any) {
    this.showLoading(loadIndex);
    this.httpClient.post(this.config.api + apiName,
      params, { headers })
      .subscribe(
        res => {//请求成功
          // this.responseSuccess(res, callback);
          callback(res['data']);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        error => {//请求失败
          this.requestFailed(apiName, error);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {//
            complete();
          }
        },
        () => {//请求完成
          this.hideLoading(loadIndex);
        });
  }
  private get(apiName: string, params: object, callback: any, fail: any, complete: any, loadIndex: any) {
    this.showLoading(loadIndex);
    this.httpClient.get(this.config.api + apiName,
      params)
      .subscribe(
        (res) => {
          callback(res['data']);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        error => {
          this.requestFailed(apiName, error);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        () => {
          this.hideLoading(loadIndex);
        });
  }
  private put(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any, loadIndex: any) {
    this.showLoading(loadIndex);
    this.httpClient.put(this.config.api + apiName,
      params, { headers })
      .subscribe(
        (res) => {
          callback(res['data']);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        error => {
          this.requestFailed(apiName, error);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        () => {
          this.hideLoading(loadIndex);
        }
      );
  }
  private delete(apiName: string, params: object, callback: any, fail: any, complete: any, headers: any, loadIndex: any) {
    this.showLoading(loadIndex);
    this.httpClient.delete(this.config.api + apiName)
      .subscribe(
        (res) => {
          callback(res['data']);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        error => {
          this.requestFailed(apiName, error);
          this.hideLoading(loadIndex);
          if (typeof complete == "function") {
            complete();
          }
        },
        () => {
          this.hideLoading(loadIndex);
        });
  }

  private requestFailed(apiName: string, err) {
    switch (err.status) {
      case 401:
        break;
      case 200://请求成功,响应结果不成功
        this.doResError(err.body.result, err.body['msg'],apiName);
        break;
      case 404:
        if (this.config.debug) {
          alert('请求失败，未找到请求地址(' + apiName + ")");
        } else {
          this.alertMsg(this.errorInfo.syserror);
        }
        break;
      case 403:

        break;
      case 500:
        if (this.config.debug) {
          alert('请求失败，服务器出错(' + apiName + ")");
        } else {
          this.alertMsg(this.errorInfo.syserror);
        }
        break;
      default: {
        if (this.config.debug) {
          alert(JSON.stringify(err));
        } else {
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
  private doResError(code, msg,apiName) {
    switch (code) {
      case '1002':
        this.alertMsg(this.errorInfo.invalidError)
        this.app.getRootNav().push(LoginPage);
        break;
      default: {
        if (this.config.debug) {
          alert(msg + "("+apiName+":"+ code + ")");
        } else {
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
  private showLoading(index) {
    if (this.loading[index].show) {
      this.loading[index].loading = this.loadingCtrl.create({
        content: this.loading[index].text
      })
      this.loading[index].loading.present();
    }
  }
  private hideLoading(index) {
    if (this.loading[index].show) {
      this.loading[index].loading.dismiss();
    }
    this.loading.slice(index, 1);
  }
}

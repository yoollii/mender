/**
 * app 全局配置文件
 */
import { Injectable } from '@angular/core';
@Injectable()
export class AppConfig {
    static debug = true;
    //控制网络请求、日志输出等,外网不需要输出的日志用该阀值控制
    //  true 调试,api=dev_api
    // false 正式, api = pro_api;
    static isWeb = false;
    //由于网页调试存在跨域问题,在网页中调试需要用反向代理
    static proxy_dev_api = '/dev/api/';
    static proxy_pro_api = '/pro/api/';
    static dev_api = 'http://192.168.1.250:8080/app/';
   // static dev_api = 'http://192.168.1.15:8080/app/';//xiexin
    static pro_api = '';
    debug;
    api;
	constructor(){
        this.debug = AppConfig.debug;
        const isWeb = AppConfig.isWeb;
        const debug = AppConfig.debug;
        if(isWeb&&debug){
            this.api = AppConfig.proxy_dev_api;
        }else if(isWeb&&!debug){
            this.api = AppConfig.proxy_pro_api;
        }else if(!isWeb&&debug){
            this.api = AppConfig.dev_api;
        }else if(!isWeb&&!debug){
            this.api = AppConfig.pro_api;
        }
	}
}
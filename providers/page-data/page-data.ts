import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PageDataProvider {
  current_page=1;//当前页
  next_page=1;//下一页
  more_data = true;//是否还有更多数据
  total_page = 1;//总页数
  list =[];//数据列表
  constructor(public http: HttpClient) {
   
  }
  public refresh(){
    this.current_page=1;
    this.next_page=1;
    this.total_page = 1;
    this.list = [];
    this.more_data = true;
  }
  public load(data){
    this.current_page = data['pageIndex']?data['pageIndex']:1;
    this.next_page = data['nextPage']?data['nextPage']:1;
    this.total_page = data['total']?data['total']:1;
    this.current_page = data['currentPage']?data['currentPage']:1;
    this.list = data['list']?this.list.concat(data['list']):this.list;
    this.more_data = this.haveData(this.haveData);
  }
  private haveData(data){
    if(this.total_page==this.current_page){
      return false;
    }
    return true;
  }
}

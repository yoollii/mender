import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeAllStudentsPage } from '../me-all-students/me-all-students';
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
/**
 * Generated class for the TeachersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teachers',
  templateUrl: 'teachers.html',
})
export class TeachersPage {
  @ViewChild('myCanvas') canvasRef: any;
  student:string;
  teacher:string;
  controlText:boolean;
  apprentice1: object;
  isHidden1 = true;
  apprentice2: any;
  isHidden2 = true;
  apprentice3: any;
  isHidden3 = true;
  teachers: any;
  isHidden4 = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              private http: HttpServiceProvider) {
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
  }
  showPrompt(text, type: number) {
    const prompt = this.alertCtrl.create({
      // title: 'Login',
      cssClass:'teachersAlert',
      message: "输入工号：",
      inputs: [
        {
          name: 'title',
          placeholder: '工号'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: text,
          handler: data => {
            if(type == 1) {
              this.http.request({
                url: 'my/entermymaster/'+data.title,
                type: 'get',
                success: res => {
                  this.TeacherOrApprenticeAlert(text.substring(2, text.length));
                }
              });
            }
            if(type == 2) {
              this.http.request({
                url: 'my/entermyfollower/'+data.title,
                type: 'get',
                success: res => {
                  this.TeacherOrApprenticeAlert(text.substring(2, text.length));
                }
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad() {
    this.canvasRef.nativeElement.height=parseInt($('.div').css('height'));
    this.canvasRef.nativeElement.width=parseInt($('.div').css('width'));
    let ctx: CanvasRenderingContext2D =this.canvasRef.nativeElement.getContext('2d');
    this.http.request({
      url: 'my/masterapprenticelistall',
      type: 'get',
      success: res => {
        if(res.length >= 3) {
          this.apprentice1 = res[0];
          this.apprentice2 = res[1];
          this.apprentice3 = res[2];
          return;
        }
        if(res.length > 0 && res.length < 3) {
          this.apprentice1 = res[0];
          this.isHidden2 = false;
          this.isHidden3 = false;
        } 
        if(res.length > 1 && res.length < 3) {
          this.apprentice2 = res[1];
          this.isHidden2 = true;
        }
        ctx.strokeStyle = "#7a6846";
        //2
        if(res.length > 1) {
          ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
          ctx.lineTo($('.students-canvas-1').position().left,$('.students-canvas-1').offset().top);
        }
        //1
        if(res.length > 0) {
          ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
          ctx.lineTo(this.canvasRef.nativeElement.width/2,$('.students-canvas-2').offset().top);
        }
        //3
        if(res.length > 2) {
          ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
          ctx.lineTo($('.students-canvas-3').position().left,$('.students-canvas-3').offset().top);
        }
        ctx.stroke(); 
      }
    });
    this.http.request({
      url: 'my/masterapprenticerelationship',
      type: 'get',
      success: res => {
        this.teachers = res.master[0];
        if(this.teachers != null) {
          
          ctx.strokeStyle = "#7a6846";
          ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-1').offset().top);
          ctx.lineTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
          ctx.stroke(); 
        }else {
          this.isHidden4 = false;
        }
      }
    });
  }
  toStudents(text, type: number){
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
    this.controlText=false;
    this.showPrompt(text, type);
  }
  toTeacher(text, type: number){
    this.student="assets/imgs/person/teachers/cup.png";
    this.teacher='assets/imgs/person/teachers/teacherIconColor.png';
    this.controlText=true;
    this.showPrompt(text, type);
  }
  showAllAtudents(){
    this.navCtrl.push(MeAllStudentsPage);
  }
  TeacherOrApprenticeAlert(str: string) {
    const alert = this.alertCtrl.create({
      cssClass: 'tips-alert',
      title: str + '请求发送成功'
    })
    alert.present();
  }
}

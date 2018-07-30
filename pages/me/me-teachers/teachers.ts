import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeAllStudentsPage } from '../me-all-students/me-all-students';
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
  }
  showPrompt(text) {
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
            console.log('Saved clicked');
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

    // console.log($('.teachers-canvas-1').position().top);
    //1
    ctx.strokeStyle = "#7a6846";
		ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-1').offset().top+parseInt($('.teachers-canvas-1').css('height'))/2);
    ctx.lineTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
    //2
    ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
    ctx.lineTo($('.students-canvas-1').offset().left+parseInt($('.students-canvas-1').css('width'))/2,$('.students-canvas-1').offset().top);
//3
    ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
    ctx.lineTo(this.canvasRef.nativeElement.width/2,$('.students-canvas-2').offset().top);
//4
    ctx.moveTo(this.canvasRef.nativeElement.width/2,$('.teachers-canvas-2').offset().top);
    ctx.lineTo($('.students-canvas-3').offset().left,$('.students-canvas-3').offset().top);
    ctx.stroke();

  }
  toStudents(text){
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
    this.controlText=false;
    this.showPrompt(text);
  }
  toTeacher(text){
    this.student="assets/imgs/person/teachers/cup.png";
    this.teacher='assets/imgs/person/teachers/teacherIconColor.png';
    this.controlText=true;
    this.showPrompt(text);
  }
  showAllAtudents(){
    this.navCtrl.push(MeAllStudentsPage);
  }
}

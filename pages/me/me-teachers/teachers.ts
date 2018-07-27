import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  student:string;
  teacher:string;
  controlText:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachersPage');
  }
  toStudents(){
    this.student="assets/imgs/person/teachers/cupColor.png";
    this.teacher='assets/imgs/person/teachers/teacherIcon.png';
    this.controlText=false;
  }
  toTeacher(){
    this.student="assets/imgs/person/teachers/cup.png";
    this.teacher='assets/imgs/person/teachers/teacherIconColor.png';
    this.controlText=true;
  }
}

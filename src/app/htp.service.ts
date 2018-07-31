import { Injectable } from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from 'angularfire2/database';

@Injectable()
export class HtpService {

  headline = '';
  bodycopy = '';
  date = '';
  daypart = '';
  company = '';
  instructor = '';
  landingcourse = '';
  course = '';
  topline = '';
  urltowebpageorvideo = '';
  script_url = 'https://script.google.com/macros/s/AKfycbwKvNu6PGug_zqF70j5U4-2nKfFoOf-U20KP0RbXSPNt1lT8nRI/exec';
  homeList: AngularFireList<any>;
  counted = '';
  afterCounted = '';
  constructor(private http: Http, private  jsonp: Jsonp, private firebase: AngularFireDatabase) {}

  setFirstFormValues(hl, body, date, dayp, course) {
  this.headline = hl;
  this.bodycopy = body;
  this.date = date;
  this.daypart = dayp;
  this.course = course;
  this.homeList = this.firebase.list('Users');


  }

  insertFirstFormValues(){

    this.jsonp.request(this.script_url + '?headline=' + this.headline + '&body_copy=' + this.bodycopy + '&datee=' + this.date +
      '&daypart=' + this.daypart + '&course=' + this.course + '&action=insert',  {method: 'Get'}
    )
      .subscribe(
        (data) => {
          console.log(data.toString());
        },
        (error) => {
          console.log(error.toString());
        }
      );



  }

}

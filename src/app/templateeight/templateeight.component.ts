import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Jsonp} from "@angular/http";
import {HtpService} from "../htp.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AngularFireDatabase} from "angularfire2/database";
@Component({
  selector: 'app-templateeight',
  templateUrl: './templateeight.component.html',
  styleUrls: ['./templateeight.component.css']
})
export class TemplateeightComponent implements OnInit {
title = "Ad Hoc Notification Tool";
topline = "";
deepdrive = "";
script = '';
counted = '';
aCounte = '';
  constructor(private router: Router, private jsonp: Jsonp, private htp: HtpService, private toastr: ToastsManager, vcr: ViewContainerRef, private fb: AngularFireDatabase){
    this.toastr.setRootViewContainerRef(vcr);
    let myself = this;
    this.fb.database.ref("Users").once("value").then(function(snapshot){
      let a = snapshot.numChildren().toString();
      myself.counted = a;
    });
  }

  ngOnInit() {
  }
  back() {
  this.router.navigate(['Landing']);
  }

  sub(e) {
    e.preventDefault();
    this.topline = e.target.elements[0].value;
    this.deepdrive = e.target.elements[1].value;

    if (this.topline == '' || this.deepdrive == '')
    {
      this.toastr.error('All Fields are Required', 'Error');
    }
    else if(this.htp.headline == '' || this.htp.bodycopy == '' || this.htp.daypart == '' || this.htp.course == '')
    {
      this.toastr.error("System has either lost the first form values or haven't filled it. Please re-fill the first form to continue.", 'Error');
      e.target.elements[0].value = '';
      e.target.elements[1].value = '';

    }
    else {
      let myself = this;
      this.script = this.htp.script_url + '?callback=JSONP_CALLBACK&headline=' + this.htp.headline +
        '&body_copy=' + this.htp.bodycopy +
        '&datee=' + this.htp.date +
        '&daypart=' + this.htp.daypart +
        '&course=' + this.htp.course +
        '&topline=' + this.topline +
        '&dd=' + this.deepdrive +
        '&company=' + this.htp.company + 
        '&instructor=' + this.htp.instructor +
        '&action=eight';
      this.jsonp.request(this.script, {method: 'Get'})
        .subscribe(
          (response) => console.log(response.json()),
          (data) => console.log(data.json())
        );

      this.htp.homeList.push({
        headline: this.htp.headline,
        bodycopy: this.htp.bodycopy,
        date: this.htp.date,
        daypart: this.htp.daypart,
        course: this.htp.course,
        topline: this.topline,
        deepdrive: this.deepdrive,
        company: this.htp.company,
        instructor: this.htp.instructor

      });

      this.fb.database.ref('Users').once('value').then(function (snapshot) {
        let a = snapshot.numChildren().toString();
        myself.aCounte = a;
        if (a > myself.counted) {
          myself.toastr.success('Record Inserted', 'success');
          e.target.elements[0].value = '';
          e.target.elements[1].value = '';
          myself.htp.headline = '';
          myself.htp.bodycopy = '';
          myself.htp.daypart = '';
          myself.htp.course = '';
        }

      });
    }
  }

}

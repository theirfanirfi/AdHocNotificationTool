import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Data, Router} from '@angular/router';
import {HtpService} from '../htp.service';
import {Http, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastsManager} from "ng2-toastr";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-templatetwo',
  templateUrl: './templatetwo.component.html',
  styleUrls: ['./templatetwo.component.css']
})
export class TemplatetwoComponent implements OnInit {
  title = 'Ad Hoc Notification Tool';
  script_url = 'https://script.google.com/macros/s/AKfycbwUobmn16OvmsPAo1pvzRTMIjf0TZu2ov2o2ysLyhmHnXREKDs/exec';
  topline = '';
  urltowebpage = '';
  dataa = '';
  counted = '';
  aCounte = '';
  script = '';

  constructor(private router: Router, private htp: HtpService, private MyHttp: Http, private jsonp: Jsonp, private toastr: ToastsManager, vcr: ViewContainerRef, private fb: AngularFireDatabase){
    this.toastr.setRootViewContainerRef(vcr);
    const myself = this;
    this.fb.database.ref('Users').once('value').then(function(snapshot){
      const a = snapshot.numChildren().toString();
      myself.counted = a;
    });
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['Landing']);
  }

  submitFunc(e) {
    e.preventDefault();

    this.topline = e.target.elements[0].value;
    this.urltowebpage = e.target.elements[1].value;
    if (this.topline == '' || this.urltowebpage == '') {
      this.toastr.error('All Fields are Required', 'Error');
    }
    else if(this.htp.headline == '' || this.htp.bodycopy == '' || this.htp.daypart == '' || this.htp.course == '')
    {
      this.toastr.error("System has either lost the first form values or you haven't filled it. Please re-fill the first form to continue.", 'Error');
      e.target.elements[0].value = "";
      e.target.elements[1].value = "";

    }
    else {

      const myself = this;
      this.script = this.htp.script_url + '?callback=JSONP_CALLBACK&headline=' + this.htp.headline +
        '&body_copy=' + this.htp.bodycopy +
        '&datee=' + this.htp.date +
        '&daypart=' + this.htp.daypart +
        '&course=' + this.htp.course +
        '&topline=' + this.topline +
        '&url=' + this.urltowebpage +
        '&company=' + this.htp.company +
        '&instructor=' + this.htp.instructor +
        '&action=two';

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
        urlToVideoOrWebpage: this.urltowebpage,
        company: this.htp.company,
        instructor: this.htp.instructor,

      });

      this.fb.database.ref('Users').once('value').then(function(snapshot){
        const a = snapshot.numChildren().toString();
        myself.aCounte = a;
        if (a > myself.counted) {
          myself.toastr.success('Record Inserted', 'success');
          e.target.elements[0].value = "";
          e.target.elements[1].value = "";
          myself.htp.headline = "";
          myself.htp.bodycopy = "";
          myself.htp.daypart = "";
          myself.htp.course = "";
        }
      });
  }

}
}

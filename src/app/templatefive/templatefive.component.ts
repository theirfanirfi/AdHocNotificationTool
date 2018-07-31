import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {HtpService} from "../htp.service";
import {Http, Jsonp} from "@angular/http";
import {ToastsManager} from "ng2-toastr";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-templatefive',
  templateUrl: './templatefive.component.html',
  styleUrls: ['./templatefive.component.css']
})
export class TemplatefiveComponent implements OnInit {

 title = "Ad Hoc Notification Tool";
 topline = "";
 counted = '';
 aCounte = '';
 script = '';
 myself = this;
  constructor(private router: Router, private htp: HtpService, private jsonp: Jsonp, private toastr: ToastsManager, vcr: ViewContainerRef, private fb: AngularFireDatabase){
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

  sub(e) {
    e.preventDefault();
    this.topline = e.target.elements[0].value;

    if (this.topline == '') {
      this.toastr.error('All Fields are Required', 'Error');
    }

    else if(this.htp.headline == '' || this.htp.bodycopy == '' || this.htp.daypart == '' || this.htp.course == '')
    {
      this.toastr.error("System has either lost the first form values or you haven't filled it. Please re-fill the first form to continue.", 'Error');
      e.target.elements[0].value = "";

    }
    else {

      const myself = this;
      this.script = this.htp.script_url + '?callback=JSONP_CALLBACK&headline=' + this.htp.headline +
        '&body_copy=' + this.htp.bodycopy +
        '&datee=' + this.htp.date +
        '&daypart=' + this.htp.daypart +
        '&course=' + this.htp.course +
        '&topline=' + this.topline +
        '&company=' + this.htp.company + 
        '&instructor=' + this.htp.instructor +
        '&action=five';

      this.jsonp.request(this.script, {method: 'Get'})
        .subscribe(
          (response) => console.log(response.json()),
          (data) => console.log(data.json())
        );

      // this.jsonp.request(this.htp.script_url + "?callback=ctrlq&topline=" + this.topline + "&action=five", {method: 'Get'})
      //   .subscribe(
      //     (data) => console.log(data.toString())
      //   );

      this.htp.homeList.push({
        headline: this.htp.headline,
        bodycopy: this.htp.bodycopy,
        date: this.htp.date,
        daypart: this.htp.daypart,
        course: this.htp.course,
        topline: this.topline,
        company: this.htp.company,
        instructor: this.htp.instructor

      });

      this.fb.database.ref('Users').once('value').then(function (snapshot) {
        const a = snapshot.numChildren().toString();
        myself.aCounte = a;
        if (a > myself.counted) {
          myself.toastr.success('Record Inserted', 'success');
          e.target.elements[0].value = "";
          myself.htp.headline = "";
          myself.htp.bodycopy = "";
          myself.htp.daypart = "";
          myself.htp.course = "";
        }

      });
    }
  }

}

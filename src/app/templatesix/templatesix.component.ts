import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Jsonp} from '@angular/http';
import {HtpService} from '../htp.service';
import {ToastsManager} from "ng2-toastr";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-templatesix',
  templateUrl: './templatesix.component.html',
  styleUrls: ['./templatesix.component.css']
})
export class TemplatesixComponent implements OnInit {
	title = 'Ad Hoc Notification Tool';
	topline = '';
	deepdrive = '';
	urltovideowebpage = '';
	buttonone = '';
	urltwo = '';
	buttontwo = '';
	counted = '';
	aCounte = '';
	script = '';
	myself = this;
  constructor(private router: Router, private jsonp: Jsonp, private htp: HtpService, private toastr: ToastsManager, vcr: ViewContainerRef, private fb: AngularFireDatabase){
    this.toastr.setRootViewContainerRef(vcr);
    const myself = this;
    this.fb.database.ref('Users').once('value').then(function(snapshot){
      const a = snapshot.numChildren().toString();
      myself.counted = a;
    });
  }

  ngOnInit() {
  }
  sub(e) {
    e.preventDefault();
    this.topline = e.target.elements[0].value;
    this.deepdrive = e.target.elements[1].value;
    this.urltovideowebpage = e.target.elements[2].value;
    this.buttonone = e.target.elements[3].value;
    this.urltwo = e.target.elements[4].value;
    this.buttontwo = e.target.elements[5].value;

    if (this.topline == '' || this.deepdrive == '' || this.urltovideowebpage == '' || this.buttonone == '' || this.urltwo == '' || this.buttontwo == '') {
      this.toastr.error('All Fields are Required', 'Error');
    }
    else if(this.htp.headline == '' || this.htp.bodycopy == '' || this.htp.daypart == '' || this.htp.course == '')
    {
      this.toastr.error("System has either lost the first form values or you haven't filled it. Please re-fill the first form to continue.", 'Error');
      e.target.elements[0].value = "";
      e.target.elements[1].value = "";
      e.target.elements[2].value = "";
      e.target.elements[3].value = "";
      e.target.elements[4].value = "";
      e.target.elements[5].value = "";

    }
    else {

      // this.jsonp.request(this.htp.script_url + '?callback=ctrlq&topline=' + this.topline + '&dd=' + this.deepdrive + '&urlone=' + this.urltovideowebpage
      //   + '&btnone=' + this.buttonone + '&urltwo=' + this.urltwo + '&btntwo=' + this.buttontwo + '&action=six', {method: 'Get'})
      //   .subscribe(
      //     (data) => console.log(data.toString())
      //   );

      const myself = this;
      this.script = this.htp.script_url + '?callback=JSONP_CALLBACK&headline=' + this.htp.headline +
        '&body_copy=' + this.htp.bodycopy +
        '&datee=' + this.htp.date +
        '&daypart=' + this.htp.daypart +
        '&course=' + this.htp.course +
        '&topline=' + this.topline +
        '&dd=' + this.deepdrive +
        '&urlone=' + this.urltovideowebpage +
        '&btnone=' + this.buttonone + '' +
        '&urltwo=' + this.urltwo +
        '&btntwo=' + this.buttontwo +
        '&company=' + this.htp.company + 
        '&instructor=' + this.htp.instructor +
        '&action=six';

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
        UrlToVideoOrWebPage: this.urltovideowebpage,
        Buttonone: this.buttonone,
        UrlTwo: this.urltwo,
        ButtonTwo: this.buttontwo,
        company: this.htp.company,
        instructor: this.htp.instructor

      });

      this.fb.database.ref('Users').once('value').then(function(snapshot){
        const a = snapshot.numChildren().toString();
        myself.aCounte = a;
        if (a > myself.counted)
        {
          myself.toastr.success('Record Inserted', 'success');
          e.target.elements[0].value = "";
          e.target.elements[1].value = "";
          e.target.elements[2].value = "";
          e.target.elements[3].value = "";
          e.target.elements[4].value = "";
          e.target.elements[5].value = "";
          myself.htp.headline = "";
          myself.htp.bodycopy = "";
          myself.htp.daypart = "";
          myself.htp.course = "";
        }

      });
    }
  }

  back() {
    this.router.navigate(['Landing']);
  }

}

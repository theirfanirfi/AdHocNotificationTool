import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {HtpService} from '../htp.service';
import {Http, Jsonp} from '@angular/http';
import {ToastsManager} from 'ng2-toastr';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-templateone',
  templateUrl: './templateone.component.html',
  styleUrls: ['./templateone.component.css']
})
export class TemplateoneComponent implements OnInit {
 title = 'Ad Hoc Notification Tool';
 topline = '';
 deep_drive = '';
 urltovideowebpage = '';
 daypart = '';
 course = '';
 script = '';
 counted = '';
 aCounte = '';

  constructor(private router: Router, private MyHtp: HtpService, private htp: Http, private jsonp: Jsonp, private toastr: ToastsManager, vcr: ViewContainerRef, private fb: AngularFireDatabase){
  this.toastr.setRootViewContainerRef(vcr);
    const myself = this;
    this.daypart = this.MyHtp.daypart;
    this.course = this.MyHtp.course;

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
  sub(e){
    e.preventDefault();
    this.topline = e.target.elements[0].value;
    this.deep_drive = e.target.elements[1].value;
    this.urltovideowebpage = e.target.elements[2].value;
    this.daypart = e.target.elements[3].value;
    this.course = e.target.elements[4].value;

    // noinspection JSAnnotator
    if (this.topline == '' || this.deep_drive == '' || this.urltovideowebpage == '' || this.daypart == '' || this.course == '')
    {
      this.toastr.error('All Fields are Required '+this.MyHtp.company, 'Error');
      
    }
    else if(this.MyHtp.headline == '' || this.MyHtp.bodycopy == '' || this.MyHtp.daypart == '' || this.MyHtp.course == '')
    {
      this.toastr.error("System has lost either lost the first form values or you haven't filled filled. Please re-fill the first form to continue", 'Error');
      e.target.elements[0].value = "";
      e.target.elements[1].value = "";
      e.target.elements[2].value = "";
      e.target.elements[3].value = "";
      e.target.elements[4].value = "";

    }
    else {

      const myself = this;
      this.script = this.MyHtp.script_url + '?callback=JSONP_CALLBACK&headline=' + this.MyHtp.headline +
        '&body_copy=' + this.MyHtp.bodycopy +
        '&datee=' + this.MyHtp.date +
        '&daypart=' + this.MyHtp.daypart +
        '&course=' + this.MyHtp.course +
        '&topline=' + this.topline +
        '&dd=' + this.deep_drive +
        '&url=' + this.urltovideowebpage +
        '&daypart=' + this.daypart +
        '&course=' + this.course +
        '&company=' + this.MyHtp.company +
        '&instructor=' + this.MyHtp.instructor +
        '&action=one';


      this.jsonp.request(this.script, {method: 'Get'})
        .subscribe(
          (response) => console.log(response.json()),
          (data) => console.log(data.json())
        );

      this.MyHtp.homeList.push({
        headline: this.MyHtp.headline,
        bodycopy: this.MyHtp.bodycopy,
        date: this.MyHtp.date,
        daypart: this.daypart,
        course: this.course,
        topline: this.topline,
        deepdrive: this.deep_drive,
        urlToVideoOrWebpage: this.urltovideowebpage,
        company: this.MyHtp.company,
        instructor: this.MyHtp.instructor
      });


      this.fb.database.ref('Users').once('value').then(function(snapshot){
        const a = snapshot.numChildren().toString();
        myself.aCounte = a;
        if (a > myself.counted)
        {
          myself.toastr.success('Record Inserted', 'success');
          //myself.router.navigate(['success']);
          e.target.elements[0].value = "";
          e.target.elements[1].value = "";
          e.target.elements[2].value = "";
          e.target.elements[3].value = "";
          e.target.elements[4].value = "";
          myself.MyHtp.headline = "";
          myself.MyHtp.bodycopy = "";
          myself.MyHtp.daypart = "";
          myself.MyHtp.course = "";
        }
        else
        {
          myself.toastr.error("Error Occurred. Either you haven't filled the first form or there is connectivity problem.", 'error');
        }

      });


    }
  }

}

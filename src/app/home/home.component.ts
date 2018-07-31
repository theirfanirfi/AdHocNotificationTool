import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import { HtpService } from '../htp.service';
import {Http, Jsonp} from '@angular/http';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }

  title = 'Ad Hoc Notification Tool';
  headline = '';
  bodycopy = '';
  date = '';
  daypart = '';
  course = '';
  constructor(private router: Router, private htp: HtpService, private MyHtp: Http, private  jsonp: Jsonp, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.date = this.htp.date;
    this.daypart = this.htp.daypart;
    this.course = this.htp.landingcourse;
  }


  proceedFunc(e) {
  e.preventDefault();
  this.headline = e.target.elements[0].value;
  this.bodycopy = e.target.elements[1].value;
  this.date = e.target.elements[2].value;
  this.daypart = e.target.elements[3].value;
  this.course = e.target.elements[4].value;
  if (this.headline == '' || this.bodycopy == '' || this.date == '' || this.daypart == '' || this.course == ''){
  this.toastr.error('All Fields are required.','error');
  return false;
  }
  else {
   this.htp.setFirstFormValues(this.headline, this.bodycopy, this.date, this.daypart, this.course);
  this.router.navigate(['templates']);
  }
  }
}

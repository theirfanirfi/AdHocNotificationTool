import { Component, OnInit, NgZone, ViewContainerRef } from '@angular/core';
import { HtpService } from '../htp.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { HomeComponent } from '../home/home.component';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title = 'Ad Hoc Notification Tool';
  company = '';
  instructor = '';
  landingcourse = '';
  constructor(private myhtp: HtpService, private ngzone: NgZone, private router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    if (this.myhtp.company == '' || this.myhtp.instructor == '' || this.myhtp.landingcourse == '') {
      //dont set values into company and instructor
    } else {
        this.company = this.myhtp.company;
        this.instructor = this.myhtp.instructor;
        this.landingcourse = this.myhtp.landingcourse;
    }
  }

  ngOnInit() {
  }

  landingRefresh(e) {
    this.ngzone.runOutsideAngular(() => {
      location.reload();
    });
  }

  sub(e, date, daypart) {
    if (this.company == '' || this.instructor == '' || this.landingcourse == '') {
      this.toastr.error('Company, Instructor and Course Field can not be empty');
    } else {
      this.myhtp.company = this.company;
      this.myhtp.instructor = this.instructor;
      this.myhtp.landingcourse = this.landingcourse;
      this.myhtp.date = date;
      this.myhtp.daypart = daypart;
      this.router.navigate(['Home']);
    }
  }

  getValueCompany(e) {
    this.company = e.target.value;
  }

  getValueInstructor(e) {
    this.instructor = e.target.value;
  }

  getValueCourse(e) {
    this.landingcourse = e.target.value;
  }

}

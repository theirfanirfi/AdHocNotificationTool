import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from "ng2-toastr";
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  one(){
 	this.router.navigate(['templateone']);
  }


  two(){
 this.router.navigate(['templatetwo']);
  }

  three() {
 this.router.navigate(['templatethree']);
  }

  four() {
    this.toastr.error('No Form is defined for this template yet. Try another', 'error');
	//this.router.navigate(['templatefour']);
  }

  five()
  {
 this.router.navigate(['templatefive']);
  }

  six()
  {
this.router.navigate(['templatesix']);
  }

  seven()
  {
  this.router.navigate(['templateseven']);
  }

  eight()
  {
  this.router.navigate(['templateeight']);
  }



}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  title = "Ad Hoc Notification Tool";
  constructor() { }

  ngOnInit() {
  }

}

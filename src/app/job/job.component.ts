import {Component, Input, OnInit} from '@angular/core';
import {Job} from "./job.model";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  // @ts-ignore
  @Input() model: Job;

  constructor() { }

  ngOnInit(): void {
  }

}

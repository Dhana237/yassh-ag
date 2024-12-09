import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';
import 'animate.css';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {


  constructor(private router: Router, private aroute: ActivatedRoute, @Inject(DOCUMENT) private document: Document) { 
  }

  ngOnInit(): void {
  }

  reload(){
    this.document.location.reload();
  }


}

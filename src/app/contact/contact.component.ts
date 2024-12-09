import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';
import 'animate.css';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private aroute: ActivatedRoute, @Inject(DOCUMENT) private document: Document) { 
  }


  ngOnInit(): void {
  }

  reload(){
    this.document.location.reload();
  }

}

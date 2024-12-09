import { Component } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';    
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yassh';

  constructor(private router: Router, private aroute: ActivatedRoute, @Inject(DOCUMENT) private document: Document) { 


  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  reload(){
    this.document.location.reload();
  }


}

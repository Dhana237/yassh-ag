import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';
import 'animate.css';
import { ProductdetailsService } from '../productdetails.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 

  constructor(private router: Router, private aroute: ActivatedRoute, @Inject(DOCUMENT) private document: Document, ) { 
  }

  ngOnInit(): void {
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  reload(){
    this.document.location.reload();
  }

}

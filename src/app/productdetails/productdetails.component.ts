import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductdetailsService } from '../productdetails.service';
import 'animate.css';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit{
allProducts: Product[] = []; 
selectedProduct: Product | undefined;
splitexp: string[] = [];


  constructor(private router: Router,public prod:ProductdetailsService,private route:ActivatedRoute , @Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {
    if (!localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true'); 
      this.document.location.reload(); 
    } else {
      localStorage.removeItem('pageReloaded'); 
    }
  this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); 
      this.selectedProduct = this.prod.productitems.find(
        product => product.id === id
      );
      if (this.selectedProduct && this.selectedProduct.explanation) {
        this.splitexp = this.selectedProduct.explanation
          .split('. ')
          .filter((sentence) => sentence.trim() !== '');
      }
    });
  }

 
  onProductClick(id: number): void {
    
    this.selectedProduct = this.allProducts.find(product => product.id === id);
    if (this.selectedProduct && this.selectedProduct.explanation) {
      this.splitexp = this.selectedProduct.explanation
        .split('. ')
        .filter((sentence) => sentence.trim() !== '');
    }
  }
}

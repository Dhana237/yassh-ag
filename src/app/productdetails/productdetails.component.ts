import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductdetailsService } from '../productdetails.service';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
allProducts: Product[] = []; 
selectedProduct: Product | undefined;

  constructor(private router: Router,public prod:ProductdetailsService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); 
      this.selectedProduct = this.prod.productitems.find(
        product => product.id === id
      );
    });
  }

 
  onProductClick(id: number): void {
    this.selectedProduct = this.allProducts.find(product => product.id === id);
  }
}

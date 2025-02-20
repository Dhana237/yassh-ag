import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
   @ViewChild('tabContainer',{static:false} )tabContainer!:ElementRef;
  activeTab: string = '1';

  productDetails: { [key: string]: string } = {
    '1': 'bone-health ',
    '2': "womens-health",
    '3': "mens-health",
    '4': 'nerve-health',
    '5': 'digestive & liver-health',
    '6': 'immunomodulators',
    '7': 'sleepcare',
    '8': 'skin & hair-care',
    '9': 'cardiovascular-health',
    '10': 'general-well-being',
  };

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatProductName(value: string): string {
    return value.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  scrollTabs(container: HTMLElement, amount:number): void {
    container.scrollBy({left:amount,behavior:'smooth'})
  }
  showTab(event:Event):void{
    const tabElement = event.target as HTMLElement;
    if(tabElement){
      tabElement.scrollIntoView({behavior:'smooth',inline:'center'})
    }
  }
  onTabClick(event: Event, productKey: string): void {
    // Implement the method logic here
    console.log('Tab clicked:', productKey);
  }

  
}

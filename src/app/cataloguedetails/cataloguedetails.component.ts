import { Component, OnInit } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-cataloguedetails',
  standalone: false,
  templateUrl: './cataloguedetails.component.html',
  styleUrl: './cataloguedetails.component.scss'
})
export class CataloguedetailsComponent implements OnInit{
  ngOnInit():void{
 AOS.init({
      offset: 0,
      delay: 100,
      duration: 1000,
      easing: 'ease',
      once: false, 
      mirror: false 
    });
}
}

import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false
})
export class SignupComponent implements OnInit {

  email: string = '';
  username: string = '';
  contactno: string = '';
  password: string = '';

  products = [
    { name: 'Product 1', productCategories:[], image: 'image1.jpg', details: 'Details 1', composition: 'Composition 1', indication: 'Indication 1', editing: false },
    { name: 'Product 2', productCategories:[], image: 'image2.jpg', details: 'Details 2', composition: 'Composition 2', indication: 'Indication 2', editing: false }
  ];

  newProduct = { name: '', productCategories:[],image: '', details: '', composition: '', indication: '' };
  activeTab: string = 'user'; // Default tab is "Add New User"

  constructor(
    private auth: AuthService, 
    @Inject(ToastrService) private toastr: ToastrService, 
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  signup(): void {
    if (!this.email) {
      this.toastr.warning('Please enter a valid Email');
      return;
    }
    if (!this.password) {
      this.toastr.warning('Please enter a valid Password');
      return;
    }

    this.auth.signup(this.email, this.username, this.contactno, this.password)
      .then(() => {
        this.toastr.success('Signup successful!');
        this.clearFields();
        this.auth.logout();
      })
      .catch(err => {
        console.error('Signup Error:', err);
        this.toastr.error('Signup failed. Please try again.');
      });
  }

  private clearFields(): void {
    this.email = '';
    this.username = '';
    this.contactno = '';
    this.password = '';
   
  }
  image: File | null = null;       // Store the selected image file
  imagePreview: string | null = null; // Store the image preview URL
  
  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      this.image = file; // Save the file
      const reader = new FileReader();
      
      // Generate image preview URL
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  


  addProduct(): void {
    if (this.newProduct.name && this.newProduct. productCategories && this.newProduct.details && this.newProduct.composition && this.newProduct.indication) {
      this.products.push({ ...this.newProduct, editing: false });
      this.newProduct = { name: '',   productCategories:[]  , image: '', details: '', composition: '', indication: '' };
    }
  }

  editProduct(product: any): void {
    product.editing = true;
  }

  updateProduct(product: any): void {
    product.editing = false;
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
  }
  
  
  productCategories: string[] = [
    'Bone Health',
    "Women's Health",
    "Men's Health",
    'Nerve Health',
    'GI Health',
    'Renal Health',
    'Immunomodulator',
    'Sleepcare'
  ];
  
  
}

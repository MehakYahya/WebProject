import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf} from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,  NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup;
  products: { name: string; price: number; image: string;description: string; quantity: number}[] = []; // Array to store products
  imagePreview: string | null = null;


  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Only digits
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]] ,
      quantity: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]]

    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAddProduct() {
    if (this.productForm.valid) {
      const { name, price,description,quantity } = this.productForm.value;
      const image = this.imagePreview || '';

      // Use the service to add the product
      this.productService.addProduct({ name, price: parseFloat(price), image,description , quantity: parseInt(quantity, 10)});
      alert('Product added successfully!');

      // Reset the form after adding the product
      this.productForm.reset();
      this.imagePreview = null;
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductService } from '../product.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [
    NgIf,
    ReactiveFormsModule
  ]
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Only digits
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    });
  }

  ngOnInit(): void {
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({image: file});
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
      const {name, price, description, quantity} = this.productForm.value;
      const image = this.imagePreview || '';

      const product = {
        name,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity, 10),
        image,
      };

      console.log('Adding product:', product);

      this.productService.addProduct(product).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.productForm.reset();
          this.imagePreview = null;
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert(error.error?.message || 'Error adding product, please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

}

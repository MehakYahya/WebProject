import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  selectedQuantity?: number;
}

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  imports: [NgForOf, FormsModule],
})
export class ViewProductComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

  constructor(private productService: CustomerService, private router: Router) {}

  addToCart(product: Product) {
    const selectedQuantity = product.selectedQuantity || 1;

    if (selectedQuantity > product.quantity) {
      alert(`Only ${product.quantity} items are available in stock.`);
      return;
    }

    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.selectedQuantity =
        (existingProduct.selectedQuantity || 0) + selectedQuantity;
    } else {
      const productToAdd = { ...product, selectedQuantity };
      cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${selectedQuantity} of ${product.name} to cart.`);
  }

  viewCart() {
    this.router.navigate(['/cart']).then(() => {
      console.log('Navigated to cart'); // Log success
    });
  }

  ngOnInit() {
    // Fetch products using CustomerService
    this.productService.getProducts();
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}

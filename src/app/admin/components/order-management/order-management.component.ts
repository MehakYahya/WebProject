import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  imports: [NgForOf, CurrencyPipe],
  standalone: true,
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = []; // All orders
  filteredOrders: any[] = []; // Orders after filtering

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Fetch orders from the backend
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.filteredOrders = orders; // Initialize filtered orders
    });
  }

  // Filter orders by status
  filterOrders(status: string): void {
    if (status === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);
    }
  }

  // Calculate total price for an order
  calculateTotalPrice(order: any): number {
    return order.items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Group products with their quantities
  groupProducts(order: any): any[] {
    const groupedProducts: { name: string; quantity: number }[] = [];

    order.items.forEach((item: any) => {
      const existingProduct = groupedProducts.find(product => product.name === item.name);
      if (existingProduct) {
        existingProduct.quantity += item.quantity;
      } else {
        groupedProducts.push({ name: item.name, quantity: item.quantity });
      }
    });
    return groupedProducts;
  }
}

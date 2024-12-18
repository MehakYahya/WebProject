import { Component, OnInit } from '@angular/core';
import { OrderService} from '../../services/order.service';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  imports: [NgForOf, CurrencyPipe],
  standalone: true,
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Fetch orders from the backend
    this.orderService.getOrders().subscribe((orders) => {
      // Update the orders array and filtered orders
      this.orders = orders;
      this.filteredOrders = orders;
    });

  }
  filterOrders(status: string): void {
    if (status === 'All') {
      this.filteredOrders = this.orders;  // Show all orders if 'All' is selected
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);  // Filter by the selected status
    }
  }

  calculateTotalPrice(order: any): number {
    return order.items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  groupProducts(order: any): any[] {
    const groupedProducts: { name: string; quantity: number }[] = [];

    order.items.forEach((item: any) => {
      const existingProduct = groupedProducts.find(product => product.name === item.name);
      if (existingProduct) {
        existingProduct.quantity += item.quantity; // Sum the quantities
      } else {
        groupedProducts.push({ name: item.name, quantity: item.quantity });
      }
    });
    return groupedProducts;
  }

  }

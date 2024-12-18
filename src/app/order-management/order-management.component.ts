import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
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

      // Update counts after orders are loaded
      const total = this.getTotalOrders();
      const delivered = this.getDeliveredOrders();
      const pending = this.getPendingOrders();
      this.orderService.updateOrderCounts(total, delivered, pending);

      // Save the fetched orders to localStorage
      this.saveOrdersToLocalStorage();
    });

  }

  getTotalOrders(): number {
    return this.orders.length;
  }

  getDeliveredOrders(): number {
    return this.orders.filter((order) => order.status === 'Delivered').length;
  }

  getPendingOrders(): number {
    return this.orders.filter((order) => order.status !== 'Delivered').length;
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

  updateStatus(order: any, newStatus: string, clickedButton: HTMLButtonElement, allButtons: HTMLButtonElement[]): void {
    // Update the order status locally first
    order.status = newStatus;
    // Disable the clicked button to prevent further clicks
    clickedButton.disabled = true;

    // Enable the other button
    const otherButton = allButtons.find(button => button !== clickedButton);
    if (otherButton) {
      otherButton.disabled = false;
    }

    // Send the updated status to the backend
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe(
      response => {
        // Status updated successfully
        console.log('Order status updated successfully:', response);
      },
      error => {
        console.error('Error updating status:', error);
      }
    );
  }

  saveOrdersToLocalStorage(): void {
    // Assuming the orders are stored in this.orders
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

}




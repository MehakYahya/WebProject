import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import {NgForOf} from '@angular/common'; // Assuming the service you have written

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Subscribe to the order lists in the service
    this.orderService.pendingOrders$.subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;  // Set initial order list to all orders
    });

    this.orderService.unpaidOrders$.subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;
    });

    this.orderService.toBeReviewedOrders$.subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
  }

  filterOrders(status: string): void {
    if (status === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);
    }
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus);
  }
}

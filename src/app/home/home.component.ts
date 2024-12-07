import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NgIf, NgForOf],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pendingOrders: any[] = [];
  unpaidOrders: any[] = [];
  toBeReviewedOrders: any[] = [];
  showAllPendingOrders: boolean = false; // Flag to control 'See More'

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Subscribe to the orders Observable to get real-time updates
    this.orderService.pendingOrders$.subscribe((orders) => {
      this.pendingOrders = orders;
    });

    this.orderService.unpaidOrders$.subscribe((orders) => {
      this.unpaidOrders = orders;
    });

    this.orderService.toBeReviewedOrders$.subscribe((orders) => {
      this.toBeReviewedOrders = orders;
    });
  }

  // Toggle "See More" functionality for pending orders
  toggleSeeMore() {
    this.showAllPendingOrders = !this.showAllPendingOrders;
  }

  // Mark an order as To Be Reviewed
  markAsToBeReviewed(orderNumber: string) {
    const order = this.pendingOrders.find((o) => o.orderNumber === orderNumber);
    if (order) {
      // Remove from pending orders and add to toBeReviewed orders
      this.pendingOrders = this.pendingOrders.filter(
          (o) => o.orderNumber !== orderNumber
      );
      this.toBeReviewedOrders.push({ ...order, status: 'To Be Reviewed' });

      // Call the service to update the order status
      this.orderService.updateOrderStatus(orderNumber, 'toBeReviewed');
    }
  }

  // Mark an order as Unpaid
  markAsUnpaid(orderNumber: string) {
    const order = this.pendingOrders.find((o) => o.orderNumber === orderNumber);
    if (order) {
      // Remove from pending orders and add to unpaid orders
      this.pendingOrders = this.pendingOrders.filter(
          (o) => o.orderNumber !== orderNumber
      );
      this.unpaidOrders.push({ ...order, status: 'Unpaid' });

      // Call the service to update the order status
      this.orderService.updateOrderStatus(orderNumber, 'unpaid');
    }
  }
}

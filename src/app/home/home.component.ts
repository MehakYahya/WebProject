import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit{
  totalOrders = 0;
  deliveredOrders = 0;
  pendingOrders = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.totalOrders$.subscribe(count => (this.totalOrders = count));
    this.orderService.deliveredOrders$.subscribe(count => (this.deliveredOrders = count));
    this.orderService.pendingOrders$.subscribe(count => (this.pendingOrders = count));
  }
}

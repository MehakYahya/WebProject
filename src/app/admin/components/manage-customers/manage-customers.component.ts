import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
  imports: [NgForOf],
  standalone: true
})
export class ManageCustomersComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
    });
  }
}

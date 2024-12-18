import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
  standalone: true,
  imports: [NgForOf, DatePipe, NgIf],
})
export class ManageCustomersComponent implements OnInit {
  customers: any[] = []; // To store the customer data from the backend

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  // Fetch customers from the backend
  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data.customers; // Adjust to access the 'customers' key
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        alert('Failed to load customer data.');
      },
    });
  }
}

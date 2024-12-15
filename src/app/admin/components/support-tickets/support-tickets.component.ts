import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css'],
  imports: [NgIf, NgForOf]
})
export class SupportTicketsComponent implements OnInit {
  tickets: any[] = [];   // Array to hold ticket objects
  loading = false;       // For spinner/loading state
  errorMessage = '';     // String for error message display

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.supportService.getSupportTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load support tickets';
        console.error(error);
        this.loading = false;
      },
    });
  }

  resolveTicket(ticketId: any) { // Change from 'string' to 'any' if type enforcement isn't needed
    this.supportService.resolveTicket(ticketId).subscribe({
      next: () => {
        this.loadTickets(); // Reload tickets after resolving one
      },
      error: (error) => {
        console.error('Error resolving ticket', error);
      },
    });
  }
}

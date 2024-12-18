import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

// Extended Seller Interface
interface Seller {
  email: string;
  name: string;
  status: 'Approved' | 'Rejected' | 'Pending';
}

@Component({
  selector: 'app-manage-sellers',
  templateUrl: './manage-sellers.component.html',
  styleUrls: ['./manage-sellers.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ManageSellersComponent implements OnInit {
  sellers: Seller[] = []; // List of sellers

  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.fetchSellersStatus(); // Fetch seller data when the component initializes
  }

  // Fetch sellers with their statuses
  fetchSellersStatus() {
    this.sellerService.getSellersWithStatus().subscribe((response) => {
      console.log('Sellers API Response:', response); // Debug log
      this.sellers = response.sellers; // Assign to sellers array
    });
  }

  // Approve a seller and update status
  approveSeller(email: string) {
    this.sellerService.approveSeller(email).subscribe(() => {
      this.updateSellerStatus(email, 'Approved');
    });
  }

  // Reject a seller and update status
  rejectSeller(email: string) {
    this.sellerService.rejectSeller(email).subscribe(() => {
      this.updateSellerStatus(email, 'Rejected');
    });
  }

  // Update seller status locally to retain seller info
  private updateSellerStatus(email: string, newStatus: 'Approved' | 'Rejected') {
    this.sellers = this.sellers.map((seller) => {
      return seller.email === email ? { ...seller, status: newStatus } : seller;
    });
  }

  // Return a color for the seller's status for visual clarity
  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'blue';
    }
  }
}

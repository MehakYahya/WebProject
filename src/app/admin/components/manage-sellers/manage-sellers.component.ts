import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

// Extended Seller Interface
interface Seller {
  email: string;
  name: string;
  status: 'Approved' | 'Rejected' | 'Pending'; // Status is mandatory


}

@Component({
  selector: 'app-manage-sellers',
  templateUrl: './manage-sellers.component.html',
  styleUrls: ['./manage-sellers.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ManageSellersComponent implements OnInit {
  sellers: Seller[] = [];

  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.fetchSellersStatus();
  }

  // Fetch all sellers with their statuses
  fetchSellersStatus() {
    this.sellerService.getSellersWithStatus().subscribe((response) => {
      console.log('Sellers API Response:', response);
      this.sellers = response.sellers; // Assumes response contains all sellers with statuses
    });
  }

  approveSeller(email: string) {
    this.sellerService.approveSeller(email).subscribe(() => {
      console.log(`Seller ${email} approved.`);
      this.updateSellerStatus(email, 'Approved');
    });
  }

  rejectSeller(email: string) {
    this.sellerService.rejectSeller(email).subscribe(() => {
      console.log(`Seller ${email} rejected.`);
      this.updateSellerStatus(email, 'Rejected');
    });
  }
  getStatusColor(status: 'Approved' | 'Rejected' | 'Pending'): string {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'orange';
    }
  }


  // Utility function to update the seller's status locally
  private updateSellerStatus(email: string, newStatus: 'Approved' | 'Rejected') {
    this.sellers = this.sellers.map((seller) =>
      seller.email === email ? { ...seller, status: newStatus } : seller
    );
  }
}

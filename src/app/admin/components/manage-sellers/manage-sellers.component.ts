import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

// Extended Seller Interface to include a status property
interface Seller {
  email: string;
  name: string;
  status?: 'Approved' | 'Rejected' | 'Pending'; // Optional property for status
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
    // Initialize sellers' data with 'Pending' status
    this.sellerService.getPendingSellers().subscribe((response) => {
      console.log('Pending Sellers API Response:', response);
      this.sellers = response.pendingSellers.map((seller) => ({
        ...seller,
        status: 'Pending', // Adding status property dynamically
      }));
    });
  }

  approveSeller(email: string) {
    this.sellerService.approveSeller(email).subscribe(() => {
      console.log(`Seller ${email} approved.`);
      this.sellers = this.sellers.map((seller) =>
        seller.email === email ? { ...seller, status: 'Approved' } : seller
      );
    });
  }

  rejectSeller(email: string) {
    this.sellerService.rejectSeller(email).subscribe(() => {
      console.log(`Seller ${email} rejected.`);
      this.sellers = this.sellers.map((seller) =>
        seller.email === email ? { ...seller, status: 'Rejected' } : seller
      );
    });
  }
}

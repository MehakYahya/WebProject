import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

interface Seller {
  email: string;
  name: string;
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
    this.sellerService.getPendingSellers().subscribe((response) => {
      console.log('Pending Sellers API Response:', response);
      this.sellers = response.pendingSellers || [];
    });
  }

  approveSeller(email: string) {
    this.sellerService.approveSeller(email).subscribe(() => {
      this.sellers = this.sellers.filter((seller) => seller.email !== email);
    });
  }
}

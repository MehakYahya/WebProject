import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-manage-sellers',
  templateUrl: './manage-sellers.component.html',
  styleUrls: ['./manage-sellers.component.css'],
  imports: [NgForOf],
})
export class ManageSellersComponent implements OnInit {
  sellers: any[] = [];

  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.getAllSellers().subscribe((data) => {
      this.sellers = data;
    });
  }

  approveSeller(id: string) {
    this.sellerService.approveSeller(id).subscribe(() => {
      this.sellers = this.sellers.filter((seller) => seller.id !== id);
    });
  }

  rejectSeller(id: string) {
    this.sellerService.rejectSeller(id).subscribe(() => {
      this.sellers = this.sellers.filter((seller) => seller.id !== id);
    });
  }
}

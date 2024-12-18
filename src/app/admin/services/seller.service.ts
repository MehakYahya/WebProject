import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Seller {
  email: string;
  name: string;
  status: 'Approved' | 'Rejected' | 'Pending';
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private sellersStatusUrl = 'http://localhost:3000/admin/sellers-status';
  private approveSellerUrl = 'http://localhost:3000/admin/approve-seller';
  private rejectSellerUrl = 'http://localhost:3000/admin/reject-seller';

  constructor(private http: HttpClient) {}

  // Fetch sellers with statuses
  getSellersWithStatus(): Observable<{ sellers: Seller[] }> {
    return this.http.get<{ sellers: Seller[] }>(this.sellersStatusUrl);
  }

  // Approve a seller
  approveSeller(email: string): Observable<void> {
    return this.http.post<void>(this.approveSellerUrl, { email });
  }

  // Reject a seller
  rejectSeller(email: string): Observable<void> {
    return this.http.post<void>(this.rejectSellerUrl, { email });
  }
}

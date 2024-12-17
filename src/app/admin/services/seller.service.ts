import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PendingSeller {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private pendingSellersUrl = 'http://localhost:3000/admin/pending-sellers';
  private approveSellerUrl = 'http://localhost:3000/admin/approve-seller';
  private rejectSellerUrl = 'http://localhost:3000/admin/reject-seller';

  constructor(private http: HttpClient) {}

  getPendingSellers(): Observable<{ pendingSellers: PendingSeller[] }> {
    return this.http.get<{ pendingSellers: PendingSeller[] }>(this.pendingSellersUrl);
  }

  approveSeller(email: string): Observable<void> {
    return this.http.post<void>(this.approveSellerUrl, { email });
  }

  rejectSeller(email: string): Observable<void> {
    return this.http.post<void>(this.rejectSellerUrl, { email });
  }
}

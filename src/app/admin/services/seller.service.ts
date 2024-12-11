import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private apiBase = '/api/sellers';

  constructor(private http: HttpClient) {
  }

  getAllSellers() {
    return this.http.get<any[]>(`${this.apiBase}`);
  }

  approveSeller(id: string) {
    return this.http.post(`${this.apiBase}/${id}/approve`, {});
  }

  rejectSeller(id: string) {
    return this.http.post(`${this.apiBase}/${id}/reject`, {});
  }

}

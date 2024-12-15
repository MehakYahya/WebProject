import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private apiBase = 'http://localhost:3000/api/support';

  constructor(private http: HttpClient) {}

  getSupportTickets(): Observable<any> {
    return this.http.get(`${this.apiBase}/tickets`);
  }

  resolveTicket(ticketId: string): Observable<any> {
    return this.http.put(`${this.apiBase}/tickets/resolve/${ticketId}`, {});
  }
}

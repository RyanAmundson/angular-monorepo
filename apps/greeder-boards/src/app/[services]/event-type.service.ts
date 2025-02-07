import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EventType {
  id?: number;
  name: string;
}

export interface EventTypeResponse {
  data: EventType[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private readonly apiUrl = `${environment.n8nApi.baseUrl}/event-types`;

  constructor(private http: HttpClient) {}

  getEventTypes(params?: {
    page?: number;
    limit?: number;
  }): Observable<EventTypeResponse> {
    return this.http.get<EventTypeResponse>(this.apiUrl, { params: params as any });
  }

  getEventType(id: number): Observable<EventType> {
    return this.http.get<EventType>(`${this.apiUrl}/${id}`);
  }

  createEventType(eventType: Omit<EventType, 'id'>): Observable<EventType> {
    return this.http.post<EventType>(this.apiUrl, eventType);
  }

  updateEventType(id: number, eventType: Partial<EventType>): Observable<EventType> {
    return this.http.put<EventType>(`${this.apiUrl}/${id}`, eventType);
  }

  deleteEventType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 
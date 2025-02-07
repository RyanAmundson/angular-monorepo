import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Event {
  id?: number;
  timeline_id?: number;
  title: string;
  description?: string;
  event_date: Date;
  created_at?: Date;
  event_type_id?: number;
}

export interface EventResponse {
  data: Event[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = `${environment.n8nApi.baseUrl}`;

  constructor(private http: HttpClient) {}

  // Get all events with optional pagination and filtering
  getEvents(params?: {
    page?: number;
    limit?: number;
    timeline_id?: number;
    event_type_id?: number;
    start_date?: Date;
    end_date?: Date;
  }): Observable<EventResponse> {
    return this.http.get<EventResponse>(this.apiUrl, { params: params as any });
  }

  // Get a single event by ID
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  // Get events by timeline ID
  getEventsByTimeline(timelineId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/timeline/${timelineId}`);
  }

  // Get events by event type
  getEventsByType(eventTypeId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/type/${eventTypeId}`);
  }

  // Create a new event
  createEvent(event: Omit<Event, 'id' | 'created_at'>): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  // Update an existing event
  updateEvent(id: number, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Bulk create events
  bulkCreateEvents(events: Omit<Event, 'id' | 'created_at'>[]): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.apiUrl}/bulk`, events);
  }

  // Get events by date range
  getEventsByDateRange(startDate: Date, endDate: Date): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/range`, {
      params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      }
    });
  }

  // Count events by timeline
  getEventCountByTimeline(timelineId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/timeline/${timelineId}/count`);
  }

  // Count events by type
  getEventCountByType(eventTypeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/type/${eventTypeId}/count`);
  }
} 
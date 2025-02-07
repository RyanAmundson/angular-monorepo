import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Timeline {
  id?: number;
  user_id?: number;
  title: string;
  description?: string;
  created_at?: Date;
}

export interface TimelineResponse {
  data: Timeline[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private readonly apiUrl = `${environment.n8nApi.baseUrl}/timelines`;

  constructor(private http: HttpClient) {}

  getTimelines(params?: {
    page?: number;
    limit?: number;
    user_id?: number;
  }): Observable<TimelineResponse> {
    return this.http.get<TimelineResponse>(this.apiUrl, { params: params as any });
  }

  getTimeline(id: number): Observable<Timeline> {
    return this.http.get<Timeline>(`${this.apiUrl}/${id}`);
  }

  getTimelinesByUser(userId: number): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/user/${userId}`);
  }

  createTimeline(timeline: Omit<Timeline, 'id' | 'created_at'>): Observable<Timeline> {
    return this.http.post<Timeline>(this.apiUrl, timeline);
  }

  updateTimeline(id: number, timeline: Partial<Timeline>): Observable<Timeline> {
    return this.http.put<Timeline>(`${this.apiUrl}/${id}`, timeline);
  }

  deleteTimeline(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 
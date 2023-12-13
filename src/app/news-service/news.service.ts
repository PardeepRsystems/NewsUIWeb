import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:5295/api/NewsgetAllStories';

  constructor(private httpClient: HttpClient) { }

  getNewestStories(): Observable<News[]> {
   // return this.httpClient.get<News[]>("assets/news.json");
     return this.httpClient.get<News[]>(`${this.apiUrl}`);
  }
}

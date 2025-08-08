import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'], 
  standalone : true,
  imports: [FormsModule, CommonModule]
})
export class NewsComponent implements OnInit {
  topHeadlines: Article[] = [];
  techNews: Article[] = [];
  error = '';

  private apiKey = 'c64006427d3a4e0dbab53eb92024320c'; // Replace with your NewsAPI.org API key
  private baseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTopHeadlines();
    this.fetchTechNews();
  }

  fetchTopHeadlines(): void {
    const url = `${this.baseUrl}/top-headlines?country=us&pageSize=5&apiKey=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.topHeadlines = res.articles;
      },
      error: (err) => {
        this.error = 'Failed to fetch top headlines.';
        console.error(err);
      }
    });
  }

  fetchTechNews(): void {
    const url = `${this.baseUrl}/everything?q=technology&sortBy=publishedAt&pageSize=5&apiKey=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.techNews = res.articles;
      },
      error: (err) => {
        this.error = 'Failed to fetch technology news.';
        console.error(err);
      }
    });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleString();
  }
}

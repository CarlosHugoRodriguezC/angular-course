import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/giphy.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '8oTNKO16X1SHpNf8RvUBkhqUWupgJYN7';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  get tags(): string[] {
    return [...this._tagsHistory];
  }

  private organizeTagsHistory(tag: string): void {
    tag = tag.trim().toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveInLocalStorage();
  }

  public searchTag(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizeTagsHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }

  private saveInLocalStorage(): void {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory));
  }

  private loadFromLocalStorage(): void {
    const tags = localStorage.getItem('tags');

    if (!tags || tags.length === 0) return;

    this._tagsHistory = JSON.parse(tags);
    this.searchTag(this._tagsHistory[0]);
  }
}

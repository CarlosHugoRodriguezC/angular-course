import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((resp) => resp[0] || null),
      catchError((err) => {
        console.log('Error:', err);
        return of(null);
      })
    );
  }

  public searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        console.log('Error:', err);
        return of([]);
      })
    );
  }

  public searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        console.log('Error:', err);
        return of([]);
      })
    );
  }

  public searchRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        console.log('Error:', err);
        return of([]);
      })
    );
  }
}

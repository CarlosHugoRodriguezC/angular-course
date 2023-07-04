import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { ValidRegion } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: undefined,
      countries: [],
    },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequesst(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        console.log('Error:', err);
        return of([]);
      })
      // delay(2000)
    );
  }

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

  public searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequesst(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = {
            term,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequesst(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountry = {
            term,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchRegion(region: ValidRegion): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequesst(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = {
            region,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Country,
  Region,
  SmallCountry,
} from '../interfaces/restcountries.interface';
import { Observable, combineLatest, forkJoin, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly baseUrl: string = 'https://restcountries.com/v3.1';
  private readonly _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private httpClient: HttpClient) {}

  get regions(): Region[] {
    return [...this._regions];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    const ombservable = this.httpClient
      .get<Country[]>(`${this.baseUrl}/region/${region}`, {
        params: {
          fields: 'cca3,name,borders',
        },
      })
      .pipe(
        map((countries) =>
          countries.map<SmallCountry>(({ name, cca3, borders }) => ({
            name: name.common,
            cca3,
            borders: borders ?? [],
          }))
        ),
        tap(console.log)
      );
    return ombservable;
  }

  public getCountryByCode(cca3: string): Observable<SmallCountry> {
    const url = `${this.baseUrl}/alpha/${cca3}?fields=cca3,name,borders`;
    return this.httpClient.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      })),
      tap(console.log)
    );
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) {
      return of([]);
    }

    const requests: Observable<SmallCountry>[] = borders.map((cca3) => {
      return this.getCountryByCode(cca3);
    });

    return combineLatest(requests);
  }
}

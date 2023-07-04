import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { ValidRegion } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
    `
      .justify-content-stretch {
        display: flex;
        justify-content: stretch;
      }
    `,
  ],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: ValidRegion[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  public selectedRegion?: ValidRegion;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: ValidRegion) {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}

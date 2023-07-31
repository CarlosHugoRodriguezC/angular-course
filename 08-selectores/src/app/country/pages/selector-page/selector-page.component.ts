import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/restcountries.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  public onSubmit(): void {}

  public onRegionChange(): void {
    this.form
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.form.get('country')?.reset('');
        }),
        tap(() => (this.borders = [])),
        filter((region: Region) => region.length > 0),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  public onCountryChange(): void {
    this.form
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.form.get('border')?.reset('');
        }),
        filter((alphaCode: string) => alphaCode.length > 0),
        switchMap((alphaCode) =>
          this.countriesService.getCountryByCode(alphaCode)
        ),
        switchMap((smallCountry) =>
          this.countriesService.getCountryBordersByCodes(smallCountry.borders)
        )
      )
      .subscribe((smallCountries) => {
        this.borders = smallCountries
      });
  }
}

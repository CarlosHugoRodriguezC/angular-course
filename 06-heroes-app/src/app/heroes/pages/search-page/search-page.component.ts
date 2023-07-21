import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent implements OnInit {
  public searchInput = new FormControl('');
  public filteredOptions?: Observable<string[]>;
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions(value).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;

    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}

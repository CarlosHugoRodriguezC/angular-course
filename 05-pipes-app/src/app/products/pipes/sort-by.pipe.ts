import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(
    heroes: Hero[],
    sortBy?: keyof Hero,
    order: 'asc' | 'desc' = 'asc'
  ): any {
    if (!sortBy) return heroes;

    return heroes.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
      if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
      return 0;
    });
  }
}

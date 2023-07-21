import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return 'No vuela';

    return 'Vuela';
  }
}

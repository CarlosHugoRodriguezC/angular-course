import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styles: [],
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() price: number = 0;

  interval$?: Subscription;

  ngOnInit(): void {
    console.log('[PRICE COMPONENT] ngOnInit');
    this.interval$ = interval(1000).subscribe(console.log);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[PRICE COMPONENT] ngOnChanges');
    console.log(changes);
  }
  ngOnDestroy(): void {
    console.log('[PRICE COMPONENT] ngOnDestroy');
    this.interval$?.unsubscribe();
  }
}

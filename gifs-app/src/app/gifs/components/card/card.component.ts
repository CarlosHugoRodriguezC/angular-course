import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/giphy.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error('gif property is required');
    }
  }
}

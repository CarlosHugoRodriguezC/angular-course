import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar..."
      (keydown.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  txtTagInputF!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag(): void {
    console.log(this.txtTagInputF.nativeElement.value);
    const newTag = this.txtTagInputF.nativeElement.value;

    if (newTag.trim().length === 0) return;

    this.gifsService.searchTag(newTag);

    this.txtTagInputF.nativeElement.value = '';
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { PUBLISHERS } from '../../constants/heroes.constant';
import { HeroService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public publishers = PUBLISHERS;
  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.route.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');
        this.heroForm.patchValue(hero);
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value;
    return hero;
  }

  public onSubmit(): void {
    console.log(`Is valid ${this.heroForm.valid}`);
    console.log(this.heroForm.value);

    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`Hero ${hero.superhero} updated!`);
      });
      return;
    }

    this.heroService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackbar(`Hero ${hero.superhero} created!`);
      this.router.navigateByUrl(`/heroes/edit/${hero.id}`);
    });
  }

  public deleteHero(): void {
    if (!this.currentHero.id) throw new Error('Hero ID is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((resp: boolean) => resp),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero.id!)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe((_) => this.router.navigateByUrl('/heroes'));
  }

  public showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok!', { duration: 2500 });
  }
}

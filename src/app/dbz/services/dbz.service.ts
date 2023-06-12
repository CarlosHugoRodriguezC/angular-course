import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interrface';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class DbzService {
  public characters: Character[] = [
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000,
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500,
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 8500,
    },
  ];

  addCharacter(character: Character): void {
    this.characters.push({ ...character, id: uuid() });
  }

  deleteCharacter(id: string): void {
    this.characters = this.characters.filter(
      (character) => character.id !== id
    );
  }
}

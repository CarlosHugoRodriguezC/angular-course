import { Publisher } from '../interfaces/hero.interface';

export const PUBLISHERS = Object.values(Publisher).map((publisher) => ({
  id: publisher.replace(' ', '_').toLowerCase(),
  name: publisher,
}));

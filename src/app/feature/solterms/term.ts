import { Definition } from './definition';

export class Term {
  term: string;
  def: Definition[];
  associate?: string [];
  tag?: string[];

  view?: string;
  id?: string;
  authors: string[];
  creation: Date;
  modified?: Date[];
}

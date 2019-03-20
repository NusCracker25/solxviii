import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Ship } from '../ship';
import { map } from 'rxjs/operators';
import { Book } from '../book';

@Component({
  selector: 'sol-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {

   /** Based on the screen size, switch from standard to one column per row */
   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  books: Observable<Book[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public booksService: BooksService,
    public router: Router,
    public auth: AuthService) {

    }

  ngOnInit() {
    this.books = this.booksService.getBooks();
    console.log(this);
  }

  expand(id: string) {
   this.router.navigate(['/home/book', id]);
  }
}

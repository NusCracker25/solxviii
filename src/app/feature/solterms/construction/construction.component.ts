import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Term } from '../term';
import { TermsService } from '../terms.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';



@Component({
  selector: 'sol-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {
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

  terms: Observable<Term[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public termService: TermsService,
    public router: Router,
    public auth: AuthService) {

    }

  ngOnInit() {
    this.terms = this.termService.getTerms();
    console.log(this);
  }

  expand(id: string) {
   this.router.navigate(['/home/term', id]);
  }
  }

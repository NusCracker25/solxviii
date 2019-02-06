import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ShipsService } from '../ships.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'sol-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  ships: Observable<Ship[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public shipService: ShipsService,
    public router: Router,
    public auth: AuthService) {

    }

  ngOnInit() {
    this.ships = this.shipService.getShips();
    console.log(this);
  }

  expand(id: string) {
   this.router.navigate(['/home/ship', id]);
  }
}

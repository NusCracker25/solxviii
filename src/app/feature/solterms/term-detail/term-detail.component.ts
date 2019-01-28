import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TermsService } from '../terms.service';
import { Term } from '../term';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'sol-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.scss']
})
export class TermDetailComponent implements OnInit {

  term: Term;
  editing: false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private termService: TermsService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getTerm();
    console.log(this.term);
    console.log(this.route);
  }

  getTerm() {
    const uid = this.route.snapshot.paramMap.get('id');
    return this.termService.getTermData(uid).subscribe( term => this.term = term);
  }

  delete() {
    const uid = this.route.snapshot.paramMap.get('id');
    this.termService.deleteTerm(uid);
    this.router.navigate(['/home']);
  }

  updateTerm() {
    const uid = this.route.snapshot.paramMap.get('id');
    const formData = {
      term: this.term.term,
      definition: this.term.def[0].content,
      view: this.term.view
    };
    this.termService.updateTerm(uid, formData);
    this.editing = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'sol-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  languages: string[] = [
    'Français', 'Espanol' , 'English' , 'Flemish' , 'Deutsh' , 'Russki'
  ];

  authors: string[] = [
    'Duhamel du Monceau', 'Vial du Clairbois' , 'Chapman' , 'Romme' , 'Euler' , 'Dassie'
  ];

  constructor() { }

  ngOnInit() {
  }

}

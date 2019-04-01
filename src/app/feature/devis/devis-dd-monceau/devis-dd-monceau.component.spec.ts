import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisDdMonceauComponent } from './devis-dd-monceau.component';

describe('DevisDdMonceauComponent', () => {
  let component: DevisDdMonceauComponent;
  let fixture: ComponentFixture<DevisDdMonceauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisDdMonceauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisDdMonceauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

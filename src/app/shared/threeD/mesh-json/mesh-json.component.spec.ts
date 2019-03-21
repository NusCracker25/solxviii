import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshJSONComponent } from './mesh-json.component';

describe('MeshJSONComponent', () => {
  let component: MeshJSONComponent;
  let fixture: ComponentFixture<MeshJSONComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshJSONComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

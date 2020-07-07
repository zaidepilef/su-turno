import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalqrComponent } from './finalqr.component';

describe('FinalqrComponent', () => {
  let component: FinalqrComponent;
  let fixture: ComponentFixture<FinalqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

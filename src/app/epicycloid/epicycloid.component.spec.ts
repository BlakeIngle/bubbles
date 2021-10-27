import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicycloidComponent } from './epicycloid.component';

describe('EpicycloidComponent', () => {
  let component: EpicycloidComponent;
  let fixture: ComponentFixture<EpicycloidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicycloidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicycloidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

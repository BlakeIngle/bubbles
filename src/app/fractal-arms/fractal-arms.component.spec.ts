import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalArmsComponent } from './fractal-arms.component';

describe('FractalArmsComponent', () => {
  let component: FractalArmsComponent;
  let fixture: ComponentFixture<FractalArmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FractalArmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FractalArmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

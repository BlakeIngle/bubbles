import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleWarpComponent } from './circle-warp.component';

describe('CircleWarpComponent', () => {
  let component: CircleWarpComponent;
  let fixture: ComponentFixture<CircleWarpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleWarpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleWarpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

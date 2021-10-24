import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassTrianglesComponent } from './glass-triangles.component';

describe('GlassTrianglesComponent', () => {
  let component: GlassTrianglesComponent;
  let fixture: ComponentFixture<GlassTrianglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassTrianglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassTrianglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

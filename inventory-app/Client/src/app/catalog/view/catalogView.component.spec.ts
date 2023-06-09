import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogViewComponent } from './catalogView.component';

describe('CatalogComponent', () => {
  let component: CatalogViewComponent;
  let fixture: ComponentFixture<CatalogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

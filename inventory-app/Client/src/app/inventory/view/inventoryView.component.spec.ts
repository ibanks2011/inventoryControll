import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryViewComponent } from './inventoryView.component';

describe('InventoryComponent', () => {
  let component: InventoryViewComponent;
  let fixture: ComponentFixture<InventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

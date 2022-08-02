import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverymodeComponent } from './deliverymode.component';

describe('DeliverymodeComponent', () => {
  let component: DeliverymodeComponent;
  let fixture: ComponentFixture<DeliverymodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverymodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverymodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

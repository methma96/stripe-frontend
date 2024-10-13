import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerServiceRequestsComponent } from './cutomer-service-requests.component';

describe('CutomerServiceRequestsComponent', () => {
  let component: CutomerServiceRequestsComponent;
  let fixture: ComponentFixture<CutomerServiceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutomerServiceRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomerServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

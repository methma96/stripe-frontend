import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardSuccessComponent } from './onboard-success.component';

describe('OnboardSuccessComponent', () => {
  let component: OnboardSuccessComponent;
  let fixture: ComponentFixture<OnboardSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

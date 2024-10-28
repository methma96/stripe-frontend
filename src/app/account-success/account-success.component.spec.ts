import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSuccessComponent } from './account-success.component';

describe('AccountSuccessComponent', () => {
  let component: AccountSuccessComponent;
  let fixture: ComponentFixture<AccountSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

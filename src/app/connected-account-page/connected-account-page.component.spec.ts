import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedAccountPageComponent } from './connected-account-page.component';

describe('ConnectedAccountPageComponent', () => {
  let component: ConnectedAccountPageComponent;
  let fixture: ComponentFixture<ConnectedAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedAccountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

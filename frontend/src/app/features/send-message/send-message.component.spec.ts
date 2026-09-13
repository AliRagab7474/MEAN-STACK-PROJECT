import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageComponent } from './send-message.component';

describe('SendMessageComponent', () => {
  let component: SendMessageComponent;
  let fixture: ComponentFixture<SendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendMessageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should block public messaging for admin profiles', () => {
    expect(component.canSendMessageToProfile({ role: 'Admin' })).toBeFalse();
    expect(component.canSendMessageToProfile({ role: 'User' })).toBeTrue();
  });
});

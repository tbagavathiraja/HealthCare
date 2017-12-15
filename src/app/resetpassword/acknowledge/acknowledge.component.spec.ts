import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgeComponent } from './acknowledge.component';

describe('AcknowledgeComponent', () => {
  let component: AcknowledgeComponent;
  let fixture: ComponentFixture<AcknowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

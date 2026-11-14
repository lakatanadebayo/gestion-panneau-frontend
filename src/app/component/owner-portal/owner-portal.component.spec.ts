import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPortalComponent } from './owner-portal.component';

describe('OwnerPortalComponent', () => {
  let component: OwnerPortalComponent;
  let fixture: ComponentFixture<OwnerPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

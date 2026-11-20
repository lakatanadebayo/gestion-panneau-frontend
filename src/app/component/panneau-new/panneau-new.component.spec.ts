import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauNewComponent } from './panneau-new.component';

describe('PanneauNewComponent', () => {
  let component: PanneauNewComponent;
  let fixture: ComponentFixture<PanneauNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanneauNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanneauNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

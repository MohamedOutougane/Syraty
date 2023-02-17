import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersPostComponent } from './others-post.component';

describe('OthersPostComponent', () => {
  let component: OthersPostComponent;
  let fixture: ComponentFixture<OthersPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

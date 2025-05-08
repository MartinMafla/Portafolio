import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAnimationComponent } from './character-animation.component';

describe('CharacterAnimationComponent', () => {
  let component: CharacterAnimationComponent;
  let fixture: ComponentFixture<CharacterAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

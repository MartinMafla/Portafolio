import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCaseStudyComponent } from './project-case-study.component';

describe('ProjectCaseStudyComponent', () => {
  let component: ProjectCaseStudyComponent;
  let fixture: ComponentFixture<ProjectCaseStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCaseStudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

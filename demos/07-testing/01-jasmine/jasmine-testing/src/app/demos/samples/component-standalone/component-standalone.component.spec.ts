import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStandaloneComponent } from './component-standalone.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Skill } from 'src/app/skills/skill.model';
import { SkillsService } from '../../../skills/skills.service';
import { skillsdata } from './skills.data';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

describe('ComponentStandaloneComponent', () => {
  let component: ComponentStandaloneComponent;
  let fixture: ComponentFixture<ComponentStandaloneComponent>;
  let spy: any;

  beforeEach(() => {
    spy = jasmine.createSpyObj('SkillsService', ['getSkills']);
    spy.getSkills.and.returnValue(of(skillsdata));

    TestBed.overrideComponent(ComponentStandaloneComponent, {
      add: {
        providers: [{ provide: SkillsService, useValue: spy }
        ]
      }
    });
    fixture = TestBed.createComponent(ComponentStandaloneComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should list the skills', () => {
    const skills = fixture.nativeElement.querySelectorAll('.skill');
    expect(skills.length).toBe(2);
  });
});

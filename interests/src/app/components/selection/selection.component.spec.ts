import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { InterestsService } from "src/app/services/interests.service";
import { ScoresService } from 'src/app/services/scores.service';
import { ConfigService } from 'src/app/util/config/config.service';
import { SelectionComponent } from './selection.component';

describe('Selection Component', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const configSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);
  const interestSpy = jasmine.createSpyObj('InterestsService', ['getAll']);
  const scoreSpy = jasmine.createSpyObj('ScoresService', ['addScore']);
  let fixture: ComponentFixture<SelectionComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        SelectionComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: InterestsService, useValue: interestSpy },
        { provide: ScoresService, useValue: scoreSpy },
        { provide: ConfigService, useValue: configSpy },
        MessageService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);

    configSpy.getConfig.and.returnValue({ baseUrl: '' });
    scoreSpy.addScore.and.returnValue({ message: 'success' });
    const values = [1, 2, 3, 4, 5, 6, 7, 8];
    interestSpy.getAll.and.returnValue(of( values.map( val => { return {id: val, path: '', description: '' } }) ));

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render exactly 2 images', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-image').length).toBe(2);
  });

  it('should render select button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p-button')?.attributes.getNamedItem('label')?.textContent).toBe('Select');
  });

  it('should disable/enable select button', () => {
    const component = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect((compiled.querySelector('p-button') as HTMLButtonElement)?.disabled).toBe(true);

    component.selectedInterestIndex = 1;
    fixture.detectChanges();

    expect((compiled.querySelector('p-button') as HTMLButtonElement)?.disabled).toBe(false);
  });

  it('should call onSelect method when clicked', fakeAsync(() => {
    const component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'onSelect')

    const button = fixture.debugElement.nativeElement.querySelector('p-button');
    button.click()
    tick();

    expect(component.onSelect).toHaveBeenCalled();
  }));


});

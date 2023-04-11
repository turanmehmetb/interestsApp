import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { InterestsService } from "src/app/services/interests.service";
import { ConfigService } from 'src/app/util/config/config.service';
import { PopularityComponent } from './popularity.component';

describe('Popularity Component', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const configSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);
  const interestSpy = jasmine.createSpyObj('InterestsService', ['getPopularityReport']);
  let fixture: ComponentFixture<PopularityComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        PopularityComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: InterestsService, useValue: interestSpy },
        { provide: ConfigService, useValue: configSpy },
        MessageService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularityComponent);

    configSpy.getConfig.and.returnValue({ baseUrl: '' });
    const values = [1, 2, 3, 4, 5, 6, 7, 8];
    interestSpy.getPopularityReport.and.returnValue(of( values.map( val => { return {id: val, path: 'c', description: '', score: val } }) ));

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

  it('should render table after selecting `all`', () => {

    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    component.selectedData = 'all';

    expect(compiled.querySelector('p-table')).not.toBeTruthy();
    fixture.detectChanges();

    expect(compiled.querySelector('p-table')).toBeTruthy();
  });



});

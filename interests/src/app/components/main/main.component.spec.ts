import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { InterestsService } from "src/app/services/interests.service";
import { ConfigService } from 'src/app/util/config/config.service';
import { MainComponent } from './main.component';

describe('Main Component', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const configSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);
  const interestSpy = jasmine.createSpyObj('InterestsService', ['getAll']);
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        MainComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: InterestsService, useValue: interestSpy },
        { provide: ConfigService, useValue: configSpy },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);

    configSpy.getConfig.and.returnValue({ baseUrl: '' });
    const values = [1, 2, 3, 4, 5, 6, 7, 8];
    interestSpy.getAll.and.returnValue(of( values.map( val => { return {id: val, path: '', description: '' } }) ));
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render images', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-image').length).toBeGreaterThan(1);
  });
});

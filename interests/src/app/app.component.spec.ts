import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TabMenuModule } from 'primeng/tabmenu';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TabMenuModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render menu', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p-tabMenu')?.textContent).toContain('HomeSelectionPopularity');
  });
});

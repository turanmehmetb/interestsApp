import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//primeng
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { ScrollTopModule } from 'primeng/scrolltop';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { ImageComponent } from './components/imageCard/image.component';
import { MainComponent } from './components/main/main.component';
import { PopularityComponent } from './components/popularity/popularity.component';
import { SelectionComponent } from './components/selection/selection.component';
import { appRoutes } from './routes';
import { ConfigService } from './util/config/config.service';

export function configurationServiceInitializerFactory(configurationService: ConfigService): Function {
  return () => configurationService.load()
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SelectionComponent,
    PopularityComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    CardModule,
    ToastModule,
    SelectButtonModule,
    SkeletonModule,
    TableModule,
    TabMenuModule,
    ScrollTopModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configurationServiceInitializerFactory, deps: [ConfigService], multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

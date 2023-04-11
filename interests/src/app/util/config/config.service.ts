import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from './config.model';
import { of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private loaded = false;
  private configuration!: Config;

  constructor(private http: HttpClient) {
  }

  public getConfig(): Config {
    return this.configuration;
  }

  // the return value (Promise) of this method is used as an APP_INITIALIZER,
  // so the application's initialization will not complete until the Promise resolves.
  public load(): Promise<any> {
    const jsonFile = `assets/config/config.dev.json`;
    if(this.loaded) {
      return observableOf(this, this.configuration).toPromise();
    } else {
      const configurationObservable = this.http.get(jsonFile); // path is relative to that for app's index.html
      configurationObservable
        .subscribe(config => {
            this.configuration = config as Config;
            console.log(`got configuration: ${JSON.stringify(this.configuration)}`);
            this.loaded = true;
          }
        );
      return configurationObservable.toPromise();
    }
  }

}

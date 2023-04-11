import { Injectable } from "@angular/core";
import { ConfigService } from "../util/config/config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Interest } from "../util/models/interest.model";

@Injectable({ providedIn: 'root' })
export class ImagesService {

  _base: string;
  _http: HttpClient;

  constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {
        this._http = http;
        this._base = configService.getConfig().baseUrl + '/getImage';
     }

    getImage(path: string): string {
      return `${this._base}/${encodeURIComponent(path)}`;
    }
}

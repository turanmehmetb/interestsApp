import { Injectable } from "@angular/core";
import { ConfigService } from "../util/config/config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Interest } from "../util/models/interest.model";

@Injectable({ providedIn: 'root' })
export class InterestsService {

  _base: string;
  _http: HttpClient;

  constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {
        this._http = http;
        this._base = configService.getConfig().baseUrl + '/interests';
     }

    getAll(): Observable<Interest[]> {
      return this._http.get<Interest[]>(this._base)
    }

    getPopularityReport(dateType: 'week' | 'month' | 'year'): Observable<Interest[]> {
      return this._http.get<Interest[]>(`${this._base}/${dateType}`)
    }
}

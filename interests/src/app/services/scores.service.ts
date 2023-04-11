import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../util/config/config.service";
import { Score } from "../util/models/score.model";

export type AddScoreResponse = {
  message: string
}

@Injectable({ providedIn: 'root' })
export class ScoresService {

  _base: string;
  _http: HttpClient;

  constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {
        this._http = http;
        this._base = configService.getConfig().baseUrl + '/scores';
     }

    getAll(): Observable<Score[]> {
      return this._http.get<Score[]>(this._base);
    }

    addScore(id: string): Observable<AddScoreResponse> {
      return this._http.post<AddScoreResponse>(`${this._base}/${id}`, {});
    }


}

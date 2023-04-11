import { Component, OnInit } from "@angular/core";
import { InterestsService } from "src/app/services/interests.service";
import { Interest } from "src/app/util/models/interest.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  interests: Interest[] = [];

  constructor(
    private readonly interestsService: InterestsService,
    ) {}

  ngOnInit(): void {
    this.interestsService.getAll().subscribe(res => this.interests = res);
  }

}

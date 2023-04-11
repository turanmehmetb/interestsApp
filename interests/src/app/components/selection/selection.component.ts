import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { InterestsService } from "src/app/services/interests.service";
import { AddScoreResponse, ScoresService } from "src/app/services/scores.service";
import { Interest } from "src/app/util/models/interest.model";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
})
export class SelectionComponent implements OnInit {

  interests: Interest[] = [];
  selectedInterestIndex: number | null = null;

  constructor(
    private readonly interestsService: InterestsService,
    private readonly scoresService: ScoresService,
    private readonly messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.interestsService.getAll().subscribe(res => {
      const firstIndex = this.random(0, 7);
      const secondIndex = this.random(0, 6);

      this.interests.push(res[firstIndex]);
      res.splice(firstIndex, 1);

      this.interests.push(res[secondIndex]);
    });
  }

  onClick(interestIndex: number): void {
    this.selectedInterestIndex = interestIndex;
  }

  onSelect(): void {
    this.messageService.clear();
    this.scoresService.addScore(this.interests[this.selectedInterestIndex!].id).subscribe({
      next: res => this.onSelectReturn(res),
      error: () => this.onSelectReturn({ message: 'error'})
    });
  }

  onSelectReturn(response: AddScoreResponse): void {
    this.messageService.add({ severity: response.message, detail: response.message.toUpperCase()});
    this.interests = [];
    this.selectedInterestIndex = null;
    this.ngOnInit();
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

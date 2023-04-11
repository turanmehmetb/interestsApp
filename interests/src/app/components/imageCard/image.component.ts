import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ImagesService } from "src/app/services/images.service";
import { Interest } from "src/app/util/models/interest.model";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnChanges {

  @Input()
  interest: Interest | undefined;
  @Input()
  details: number | string | undefined;
  @Input()
  card = true;
  loading = true;
  path: string | undefined;

  constructor(
    private readonly imageService: ImagesService
    ) {}

  ngOnChanges(): void {
    this.loading = true;
    this.path = this.imageService.getImage(this.interest!.path);
    this.loading = false;

  }


}

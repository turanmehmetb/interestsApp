import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { InterestsService } from "src/app/services/interests.service";
import { Interest } from "src/app/util/models/interest.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
})
export class PopularityComponent implements OnInit {

  interests: Interest[] = [];
  most: Interest = new Interest();
  least: Interest = new Interest();
  dateOptions: SelectItem[] = [ { label: 'week', value: 'week' }, { label: 'month', value: 'month' }, { label: 'year', value: 'year' } ];
  dataOptions: SelectItem[] = [ { label: 'most & least', value: 'mostLeast' }, { label: 'all', value: 'all' } ];
  selectedDate: 'week' | 'month' | 'year' = 'week';
  selectedData: 'mostLeast' | 'all' = 'mostLeast';
  columns: string[] = ['id', 'name', 'score']; // for pdf

  constructor(
    private readonly interestsService: InterestsService,
    private readonly messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.getData();
  }

  onDateChange(): void {
    this.getData();
  }

  clearData(): void {
    this.interests = [];
    this.most = new Interest();
    this.least = new Interest();
  }

  exportPdf(): void {
    const doc = new jsPDF('p','pt');
    autoTable(doc, {
      columns: this.columns.map(col => { return { title: col.toUpperCase(), dataKey: col } }),
      body: this.interests as any // bad workaround - body only accepts RowInput
    });
    doc.save("popularities.pdf");
  }

  private getData(): void {
    this.clearData();
    this.interestsService.getPopularityReport(this.selectedDate).subscribe({
      next: res => {
        this.interests = res;
        this.most = this.interests.reduce((acc, val) => { return acc.score! > val.score! ? acc : val; });
        this.least = this.interests.reduce((acc, val) => { return acc.score! < val.score! ? acc : val; });
      },
      error: err => {
        this.messageService.add({ severity: 'error', detail: err.statusText});
      }
    });
  }

}

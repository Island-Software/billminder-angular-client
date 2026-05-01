import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { BillsService } from 'src/app/services/bills.service';

@Component({
    selector: 'app-bill-edit',
    templateUrl: './bill-edit.component.html',
    styleUrls: ['./bill-edit.component.css'],
    standalone: false
})
export class BillEditComponent implements OnInit {
  @Input() bill?: any;
  @Output() saveBillEvent = new EventEmitter<boolean>();

  constructor(private billsService: BillsService) {
   }

  ngOnInit(): void {
    
  }

  save() {
    if (this.bill)
      this.billsService.updateBill(this.bill)
        .subscribe(_ => this.saveBillEvent.emit(true));
  }

  close() {
    this.saveBillEvent.emit(false);
  }

  closeAndReloadParent() {
    this.saveBillEvent.emit(true);
  }

  onValueChange(value: Date): void {
    if (value === undefined)
      return
    value.setHours(0);
    value.setMinutes(0);
    value.setSeconds(0);    
  }
}

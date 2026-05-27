import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BillType } from '../../models/bill-type';
import { BillTypesService } from '../../services/bill-types.service';

@Component({
    selector: 'app-bill-type-detail',
    templateUrl: './bill-type-detail.component.html',
    styleUrls: ['./bill-type-detail.component.css']
})
export class BillTypeDetailComponent implements OnInit {
  @Input() billType?: BillType;
  @Output() saveBillTypeEvent = new EventEmitter<boolean>();

  constructor(
    private billTypeService: BillTypesService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.billType) {
      this.billTypeService.updateBillType(this.billType)
        .subscribe(_ => this.saveBillTypeEvent.emit(true));
    }
  }

  canShow(): boolean {
    return (this.billType !== null);
  }  
}

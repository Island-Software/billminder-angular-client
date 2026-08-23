import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BillsService } from '../../services/bills.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-bill-edit',
    imports: [FormsModule, BsDatepickerModule, NgxMaskDirective],
    templateUrl: './bill-edit.component.html',
    styleUrls: ['./bill-edit.component.css']
})
export class BillEditComponent implements OnInit {

  @Input() bill?: any;
  @Output() saveBillEvent = new EventEmitter<boolean>();

  constructor(private billsService: BillsService, 
    private activeModal: NgbActiveModal,) {
   }

  ngOnInit(): void {
    
  }

  save() {
    this.billsService.updateBill(this.bill)
      .subscribe(_ => {
        this.saveBillEvent.emit(true);
        this.activeModal.close(true);
      })
  }

  close() {
    this.saveBillEvent.emit(false);
    this.activeModal.close(false);
  }

  closeAndReloadParent() {
    this.saveBillEvent.emit(true);
    this.activeModal.close(true);
  }

  onValueChange(value: Date): void {
    if (value === undefined)
      return 
  }
}

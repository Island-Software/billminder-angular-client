import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceivingService } from '../../services/receiving.service';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CurrencyBrDirective } from '../../core/directive/currency-br.directive';

@Component({
    selector: 'app-receiving-edit',
    imports: [FormsModule, BsDatepickerModule, CurrencyBrDirective],
    templateUrl: './receiving-edit.component.html',
    styleUrls: ['./receiving-edit.component.css']
})
export class ReceivingEditComponent {
  @Input() receiving?: any;
  @Output() saveReceivingEvent = new EventEmitter<boolean>();

  constructor(private receivingService: ReceivingService,
      private activeModal: NgbActiveModal) { }

  save() {
    this.receivingService.update(this.receiving)
      .subscribe(_ => {
        this.saveReceivingEvent.emit(true);
        this.activeModal.close(true);
      })
  }

  close() {
    this.saveReceivingEvent.emit(false);
    this.activeModal.close(false);
  }

  closeAndReloadParent() {
    this.saveReceivingEvent.emit(true);
    this.activeModal.close(true);
  }

  onValueChange(value: Date): void {
    if (value === undefined)
      return
  }
}

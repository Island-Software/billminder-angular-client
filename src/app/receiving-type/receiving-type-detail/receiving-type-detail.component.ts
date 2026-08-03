import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReceivingType } from '../../models/receiving-type';
import { ReceivingTypesService } from '../../services/receiving-types.service';

@Component({
    selector: 'app-receiving-type-detail',
    templateUrl: './receiving-type-detail.component.html',
    styleUrls: ['./receiving-type-detail.component.css']
})
export class ReceivingTypeDetailComponent implements OnInit {
  @Input() receivingType?: ReceivingType;
  @Output() saveReceivingTypeEvent = new EventEmitter<boolean>();

  constructor(
    private receivingTypeService: ReceivingTypesService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.receivingType) {
      this.receivingTypeService.updateReceivingType(this.receivingType)
        .subscribe(_ => this.saveReceivingTypeEvent.emit(true));
    }
  }

  canShow(): boolean {
    return (this.receivingType !== null);
  }  
}

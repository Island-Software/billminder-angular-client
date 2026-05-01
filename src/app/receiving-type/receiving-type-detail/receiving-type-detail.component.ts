import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReceivingType } from 'src/app/models/receiving-type';
import { ReceivingTypesService } from 'src/app/services/receiving-types.service';

@Component({
    selector: 'app-receiving-type-detail',
    templateUrl: './receiving-type-detail.component.html',
    styleUrls: ['./receiving-type-detail.component.css'],
    standalone: false
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

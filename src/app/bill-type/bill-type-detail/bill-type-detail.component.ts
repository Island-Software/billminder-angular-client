import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BillType } from '../../models/bill-type';
import { BillTypesService } from '../../services/bill-types.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TextInputComponent } from 'src/app/forms/text-input/text-input.component';

@Component({
  selector: 'app-bill-type-detail',
  imports: [FormsModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './bill-type-detail.component.html',
  styleUrls: ['./bill-type-detail.component.css']
})
export class BillTypeDetailComponent implements OnInit {
  @Input() billType?: BillType;
  @Output() saveBillTypeEvent = new EventEmitter<boolean>();
  billTypeForm!: UntypedFormGroup;

  constructor(
    private billTypeService: BillTypesService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.billTypeForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.billType?.id),
      description: new UntypedFormControl(this.billType?.description, Validators.required),
      active: new UntypedFormControl(this.billType?.active)
    });
  }

  save() {
    if (this.billTypeForm) {            
      this.billTypeService.updateBillType(this.billTypeForm.value)
        .subscribe(_ => this.saveBillTypeEvent.emit(true));
    }
  }

  canShow(): boolean {
    return (this.billType !== null);
  }
}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { MONTHS } from '../../consts/months';
import { TextInputComponent } from '../../forms/text-input/text-input.component';
import { ReceivingType } from '../../models/receiving-type';
import { ReceivingTypesService } from '../../services/receiving-types.service';
import { ReceivingService } from '../../services/receiving.service';

@Component({
    selector: 'app-receiving-register',
    imports: [ReactiveFormsModule, BsDatepickerModule, TextInputComponent],
    templateUrl: './receiving-register.component.html',
    providers: [DatePipe],
    styleUrls: ['./receiving-register.component.css']
})
export class ReceivingRegisterComponent implements OnInit {
  @Output() saveReceivingEvent = new EventEmitter<boolean>();
  receivingTypes: ReceivingType[] = [];
  // Reactive forms
  newReceivingForm!: UntypedFormGroup;
  months = MONTHS;

  constructor(private billsService: ReceivingService, private receivingTypesService: ReceivingTypesService, private toastrService: ToastrService,
    private activeModal: NgbActiveModal,
    public datePipe : DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadBillTypes();    
  }

  loadBillTypes() {
    this.receivingTypesService.getReceivingTypes().subscribe(
      bt => this.receivingTypes = bt
    );
  }

  initializeForm() {
    var currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    this.newReceivingForm = new UntypedFormGroup({
      typeId: new UntypedFormControl('', Validators.required),
      value: new UntypedFormControl('', Validators.required),
      month: new UntypedFormControl(new Date().getMonth() + 1, Validators.required),
      year: new UntypedFormControl(new Date().getFullYear(), [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      dueDate: new UntypedFormControl(undefined)
    })
  }

  add() {

    this.billsService.create(this.newReceivingForm.value).subscribe(_ => {
      this.toastrService.success("Bill added succesfully");
      this.closeAndReloadParent();
    }, error => {
      this.toastrService.error(error.error);
    });
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
    
    value.setHours(0);
    value.setMinutes(0);
    value.setSeconds(0);    
  }

}

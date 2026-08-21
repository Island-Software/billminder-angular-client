import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MONTHS } from '../../consts/months';
import { BillType } from '../../models/bill-type';
import { BillTypesService } from '../../services/bill-types.service';
import { BillsService } from '../../services/bills.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TextInputComponent } from '../../forms/text-input/text-input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bill-register',
  imports: [FormsModule, ReactiveFormsModule, BsDatepickerModule, TextInputComponent],
  templateUrl: './bill-register.component.html',
  providers: [DatePipe],
  styleUrls: ['./bill-register.component.css']
})
export class BillRegisterComponent implements OnInit {
  @Output() saveBillEvent = new EventEmitter<boolean>();
  @Input() currentMonth: number = new Date().getMonth() + 1;
  @Input() currentYear: number = new Date().getFullYear();
  billTypes: BillType[] = [];
  // Reactive forms
  newBillForm!: UntypedFormGroup;
  months = MONTHS;

  constructor(private billsService: BillsService,
    private billTypesService: BillTypesService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadBillTypes();
    this.initializeForm();
  }

  loadBillTypes() {
    this.billTypesService.getBillTypes().subscribe(
      bt => {
        this.billTypes = bt;
        this.cdr.detectChanges();
      }
    );
  }

  initializeForm() {
    this.newBillForm = new UntypedFormGroup({
      typeId: new UntypedFormControl('', Validators.required),
      value: new UntypedFormControl('', Validators.required),
      month: new UntypedFormControl(this.currentMonth, Validators.required),
      year: new UntypedFormControl(this.currentYear, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      dueDate: new UntypedFormControl(undefined)
    })
  }

  add() {
    this.billsService.createBill(this.newBillForm.value).subscribe(_ => {
      this.toastrService.success("Bill added succesfully");
      this.closeAndReloadParent();
    }, error => {
      this.toastrService.error(error.error);
    });
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

    value.setHours(0);
    value.setMinutes(0);
    value.setSeconds(0);
  }

}

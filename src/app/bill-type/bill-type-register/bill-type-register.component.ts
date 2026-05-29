import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillTypesService } from '../../services/bill-types.service';
import { TextInputComponent } from 'src/app/forms/text-input/text-input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-bill-type-register',
    imports: [FormsModule, ReactiveFormsModule, TextInputComponent],
    templateUrl: './bill-type-register.component.html',
    styleUrls: ['./bill-type-register.component.css']
})
export class BillTypeRegisterComponent implements OnInit {
  @Output() addBillTypeEvent = new EventEmitter<boolean>();
  newBillTypeForm!: UntypedFormGroup;

  constructor(private billTypeService: BillTypesService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newBillTypeForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required),
      active: new UntypedFormControl(true)
    });
  }

  add() {
    if (this.newBillTypeForm)
      this.billTypeService.createBillType(this.newBillTypeForm.value).subscribe(response => { 
        this.toastrService.success("Bill type added successfuly");
        this.closeAndReloadParent();
      }, error => {
        this.toastrService.error(error.error);
      });
  }

  close() {
    this.addBillTypeEvent.emit(false);
    this.activeModal.close(false);
  }

  closeAndReloadParent() {
    this.addBillTypeEvent.emit(true);
    this.activeModal.close(true);
  }
}

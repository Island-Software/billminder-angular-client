import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillTypesService } from '../../services/bill-types.service';

@Component({
    selector: 'app-bill-type-register',
    templateUrl: './bill-type-register.component.html',
    styleUrls: ['./bill-type-register.component.css'],
    standalone: false
})
export class BillTypeRegisterComponent implements OnInit {
  @Output() addBillTypeEvent = new EventEmitter<boolean>();
  newBillTypeForm!: UntypedFormGroup;

  constructor(private billTypeService: BillTypesService,
    private toastrService: ToastrService) { }

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
  }

  closeAndReloadParent() {
    this.addBillTypeEvent.emit(true);
  }
}

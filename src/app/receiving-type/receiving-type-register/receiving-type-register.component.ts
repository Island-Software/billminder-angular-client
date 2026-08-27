import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '@iqx-limited/ngx-toastr';
import { TextInputComponent } from '../../forms/text-input/text-input.component';
import { ReceivingTypesService } from '../../services/receiving-types.service';

@Component({
    selector: 'app-receiving-type-register',
    imports: [ReactiveFormsModule, TextInputComponent],
    templateUrl: './receiving-type-register.component.html',
    styleUrls: ['./receiving-type-register.component.css']
})
export class ReceivingTypeRegisterComponent implements OnInit {
  @Output() addReceivingTypeEvent = new EventEmitter<boolean>();
    newReceivingTypeForm!: UntypedFormGroup;
  
    constructor(private receivingTypeService: ReceivingTypesService,
      private toastrService: ToastrService, 
      private activeModal: NgbActiveModal) { }
  
    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm() {
      this.newReceivingTypeForm = new UntypedFormGroup({
        description: new UntypedFormControl('', Validators.required),
        active: new UntypedFormControl(true)
      });
    }
  
    add() {
      if (this.newReceivingTypeForm)
        this.receivingTypeService.createReceivingType(this.newReceivingTypeForm.value).subscribe(response => { 
          this.toastrService.success("Receiving type added successfuly");
          this.closeAndReloadParent();
        }, error => {
          this.toastrService.error(error.error);
        });
    }
  
    close() {
      this.addReceivingTypeEvent.emit(false);
      this.activeModal.close(false);
    }
  
    closeAndReloadParent() {
      this.addReceivingTypeEvent.emit(true);
      this.activeModal.close(true);
    }
}

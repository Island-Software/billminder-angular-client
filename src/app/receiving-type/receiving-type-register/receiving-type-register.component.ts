import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceivingTypesService } from 'src/app/services/receiving-types.service';

@Component({
    selector: 'app-receiving-type-register',
    templateUrl: './receiving-type-register.component.html',
    styleUrls: ['./receiving-type-register.component.css'],
    standalone: false
})
export class ReceivingTypeRegisterComponent implements OnInit {
  @Output() addReceivingTypeEvent = new EventEmitter<boolean>();
    newReceivingTypeForm!: UntypedFormGroup;
  
    constructor(private receivingTypeService: ReceivingTypesService,
      private toastrService: ToastrService) { }
  
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
    }
  
    closeAndReloadParent() {
      this.addReceivingTypeEvent.emit(true);
    }
}

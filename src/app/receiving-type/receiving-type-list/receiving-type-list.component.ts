import { Component, OnInit, signal, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReceivingType } from 'src/app/models/receiving-type';
import { ReceivingTypesService } from 'src/app/services/receiving-types.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-receiving-type-list',
    imports: [FormsModule],
    templateUrl: './receiving-type-list.component.html',
    styleUrls: ['./receiving-type-list.component.css']
})
export class ReceivingTypeListComponent implements OnInit {
  originalReceivingTypes: ReceivingType[] = [];
  receivingTypes: ReceivingType[] = [];
  searchText: string = "";
  selectedReceivingType?: ReceivingType;
  modalRef!: BsModalRef;
  loading = signal(false);
  faDelete = faTrashCan;

  constructor(private receivingTypeService: ReceivingTypesService,
    private modalService: BsModalService,
    private toastrService: ToastrService) {
    this.loading.set(false);
  }

  onSelect(receivingType: ReceivingType): void {
    this.selectedReceivingType = receivingType;
  }

  ngOnInit(): void {
    this.loadReceivingTypes();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeChild(value: boolean) {
    if (value) {
      this.selectedReceivingType = undefined;
    }
  }

  deleteReceivingType(receivingType: ReceivingType) {
    this.receivingTypeService.deleteReceivingType(receivingType).subscribe(_ => {
      this.toastrService.success("Receiving type delete successfully");
      this.loadReceivingTypes();
    });
  }

  closeModal(value: boolean) {
    this.modalRef.hide();
    if (value)
      this.loadReceivingTypes();
  }

  loadReceivingTypes() {
    this.loading.set(true);
    this.receivingTypeService.getReceivingTypes()
      .subscribe(rts => {
        console.log(rts);
        
        this.receivingTypes = rts;
        this.originalReceivingTypes = rts;
        this.loading.set(false);
      });
  }

  onFilter() {
    this.receivingTypes = this.originalReceivingTypes.filter(
      t => t.description.toUpperCase().match(this.searchText.toUpperCase() + '.*')); // The /i option doesn't work
  }
}

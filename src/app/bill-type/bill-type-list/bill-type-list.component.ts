import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillType } from '../../models/bill-type';
import { BillTypesService } from '../../services/bill-types.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-bill-type-list',
    templateUrl: './bill-type-list.component.html',
    styleUrls: ['./bill-type-list.component.css'],
    standalone: false
})
export class BillTypeListComponent implements OnInit {
  originalBillTypes: BillType[] = [];
  billTypes: BillType[] = [];
  searchText: string = "";
  selectedBillType?: BillType;
  modalRef!: BsModalRef;
  loading: boolean;
  faDelete = faTrashCan;
  
  constructor(private billTypeService: BillTypesService, 
    private modalService: BsModalService,
    private toastrService: ToastrService) { 
      this.loading = false;
    }

  onSelect(billType: BillType): void {
    this.selectedBillType = billType;
  }

  ngOnInit(): void {
    this.loadBillTypes();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeChild(value: boolean) {
    if (value) {
      this.selectedBillType = undefined;
    }
  }

  deleteBillType(billType: BillType) {
    this.billTypeService.deleteBillType(billType).subscribe(_ => {
      this.toastrService.success("Bill type delete successfully");
      this.loadBillTypes();
    });
  }

  closeModal(value: boolean) {
    this.modalRef.hide();
    if (value)
      this.loadBillTypes();
  }

  loadBillTypes() {
    this.loading = true;
    this.billTypeService.getBillTypes()
      .subscribe(bts => {
        this.billTypes = bts;
        this.originalBillTypes = bts;
        this.loading = false;
      });
  }

  onFilter() {
    this.billTypes = this.originalBillTypes.filter(
      t => t.description.toUpperCase().match(this.searchText.toUpperCase() + '.*')); // The /i option doesn't work
  }
}

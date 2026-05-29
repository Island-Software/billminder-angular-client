import { ChangeDetectionStrategy, Component, OnInit, signal, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillType } from '../../models/bill-type';
import { BillTypesService } from '../../services/bill-types.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';
import { BillTypeRegisterComponent } from '../bill-type-register/bill-type-register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-bill-type-list',
    imports: [FormsModule, FontAwesomeModule],
    templateUrl: './bill-type-list.component.html',
    styleUrls: ['./bill-type-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class BillTypeListComponent implements OnInit {
  originalBillTypes: BillType[] = [];
  billTypes: BillType[] = [];
  searchText: string = "";
  selectedBillType?: BillType;
  loading = signal(false);
  faDelete = faTrashCan;
  
  constructor(private billTypeService: BillTypesService,
    private ngbModalService: NgbModal,
    private toastrService: ToastrService) { }

  onSelect(billType: BillType): void {
    this.selectedBillType = billType;
  }

  ngOnInit(): void {
    this.loadBillTypes();
  }

  openModal() {
    const modal = this.ngbModalService.open(BillTypeRegisterComponent, { centered: true });
    
     modal.result
      .then(() => {
        this.loadBillTypes();
      })
      .catch(() => {});
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

  loadBillTypes() {
    this.loading.set(true);
    this.billTypeService.getBillTypes()
      .subscribe(bts => {
        this.billTypes = bts;
        this.originalBillTypes = bts;
        this.loading.set(false);
      });
  }

  onFilter() {
    this.billTypes = this.originalBillTypes.filter(
      t => t.description.toUpperCase().match(this.searchText.toUpperCase() + '.*')); // The /i option doesn't work
  }
}

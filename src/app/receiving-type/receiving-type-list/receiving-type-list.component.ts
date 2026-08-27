import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ToastrService } from '@iqx-limited/ngx-toastr';
import { ReceivingType } from '../../models/receiving-type';
import { ReceivingTypesService } from '../../services/receiving-types.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';
import { ReceivingTypeRegisterComponent } from '../receiving-type-register/receiving-type-register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-receiving-type-list',
    imports: [FormsModule, FontAwesomeModule],
    templateUrl: './receiving-type-list.component.html',
    styleUrls: ['./receiving-type-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class ReceivingTypeListComponent implements OnInit {
  originalReceivingTypes: ReceivingType[] = [];
  receivingTypes: ReceivingType[] = [];
  searchText: string = "";
  selectedReceivingType?: ReceivingType;
  loading = signal(false);
  faDelete = faTrashCan;

  constructor(private receivingTypeService: ReceivingTypesService,
    private ngbModalService: NgbModal,
    private toastrService: ToastrService) { }

  onSelect(receivingType: ReceivingType): void {
    this.selectedReceivingType = receivingType;
  }

  ngOnInit(): void {
    this.loadReceivingTypes();
  }

  openModal() {
    const modal = this.ngbModalService.open(ReceivingTypeRegisterComponent, { centered: true });
    
    modal.result.then(() => {
      this.loadReceivingTypes();
    }).catch(() => {});
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

  loadReceivingTypes() {
    this.loading.set(true);
    this.receivingTypeService.getReceivingTypes()
      .subscribe(rts => {
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

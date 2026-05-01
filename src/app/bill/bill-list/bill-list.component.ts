import { Component, OnInit, TemplateRef } from '@angular/core';
import { Bill } from '../../models/bill';
import { Pagination } from '../../models/pagination';
import { BillsService } from '../../services/bills.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MONTHS } from 'src/app/consts/months';
import { ToastrService } from 'ngx-toastr';
import { faCopy, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { Receiving } from 'src/app/models/receiving';
import { ReceivingService } from 'src/app/services/receiving.service';

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css'],
    standalone: false
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  receivings: Receiving[] = [];
  selectedBill?: Bill;
  selectedReceiving?: Receiving;
  paginationBills: Pagination | undefined;
  pageNumberBills = 1;
  pageSizeBills = 10;
  paginationReceivings: Pagination | undefined;
  pageNumberReceivings = 1;
  pageSizeReceivings = 10;
  username: string = '';
  modalRef!: BsModalRef;
  months = MONTHS;
  selectedMonth: number;
  selectedYear: number;
  loading: boolean;
  faDelete = faTrashCan;
  faAdd = faSquarePlus;
  faCopy = faCopy;
  _selectedBillsTotal: number = 0;
  _selectedReceivingsTotal: number = 0;
  _selectedBalance: number = 0;
  billsTotal: number = 0;
  receivingsTotal: number = 0;
  balanceTotal: number = 0;
  checkAllBillsState: boolean = false;
  checkAllReceivingsState: boolean = false;

  constructor(private billsService: BillsService, private receivingService: ReceivingService, private modalService: BsModalService,
    private toastrServie: ToastrService) {
    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedYear = new Date().getFullYear();
    this.loading = false;
  }

  ngOnInit(): void {
    this.loadBillsAndReceivings();
  }

  get selectedBillsTotal(): number {
    return this._selectedBillsTotal;
  }

  set selectedBillsTotal(value: number) {
    this._selectedBillsTotal = value;
    this._selectedBalance = this._selectedReceivingsTotal - this._selectedBillsTotal;
  }

  get selectedReceivingsTotal(): number {
    return this._selectedReceivingsTotal;
  }

  set selectedReceivingsTotal(value: number) {
    this._selectedReceivingsTotal = value;
    this._selectedBalance = this._selectedReceivingsTotal - this._selectedBillsTotal;
  }

  get selectedBalance(): number {
    return this._selectedBalance;
  }

  pageChanged(event: any) {
    this.pageNumberBills = event.page;
    this.loadBillsAndReceivings();
  }

  openModalForEdit(template: TemplateRef<any>, billToEdit: Bill) {
    this.selectedBill = billToEdit;
    this.modalRef = this.modalService.show(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(value: boolean) {
    this.modalRef.hide();
    if (value)
      this.loadBillsAndReceivings();
  }

  updateTotal() {
    this.billsService.getBills(this.username, this.selectedMonth, this.selectedYear).subscribe(bills => {
      this.billsTotal = bills.result.reduce((sum, current) => sum + current.value, 0);
      this.updateBalance();
    });
    this.receivingService.get(this.username, this.selectedMonth, this.selectedYear).subscribe(receivings => {
      this.receivingsTotal = receivings.result.reduce((sum, current) => sum + current.value, 0);
      this.updateBalance();
    });    
  }

  updateBalance() {
    this.balanceTotal = this.receivingsTotal - this.billsTotal;
  }

  loadBillsAndReceivings() {
    this.loading = true;
    this.username = JSON.parse(localStorage.getItem('user')!).username;
    this.billsService.getBills(this.username, this.selectedMonth, this.selectedYear, this.pageNumberBills, this.pageSizeBills).subscribe(bills => {
      this.bills = bills.result;
      this.paginationBills = bills.pagination;
      this.loading = false;
    });

    this.receivingService.get(this.username, this.selectedMonth, this.selectedYear, this.pageNumberReceivings, this.pageSizeReceivings).subscribe(receivings => {
      this.receivings = receivings.result;
      this.paginationReceivings = receivings.pagination;
      this.loading = false;
      
    });

    this.updateTotal();
  }

  deleteBill(bill: Bill) {
    if (confirm("Are you sure to delete " + bill.billType.description + "?")) {
      this.billsService.delete(bill).subscribe(_ => this.loadBillsAndReceivings());
    }
  }

  deleteReceiving(receiving: Receiving) {
    if (confirm("Are you sure to delete " + receiving.receivingType.description + "?")) {
      this.receivingService.delete(receiving).subscribe(_ => this.loadBillsAndReceivings());
    }
  }

  payBills() {
    if (confirm("Confirm the payment of all selected bills?")) {
      this.updatePaymentStatus(true);
    }
    this.updateSelectedBillsTotal();
  }

  receive() {
    if (confirm("Confirm the receiving of all selected receivings?")) {
      this.updateReceivingStatus(true);
    }
    this.updateSelectedReceivingsTotal();
  }

  updateReceivingStatus(received: boolean) {
    let selectedReceivings = this.receivings.filter(receiving => receiving.selected);
    selectedReceivings.forEach(r => {
      r.received = received;
      this.receivingService.update(r as any).subscribe();
      r.selected = false;
    });
    this.checkAllReceivingsState = false;
  }

  reopenBills() {
    if (confirm("Confirm the reopening of all selected bills?")) {
      this.updatePaymentStatus(false);
    }
    this.updateSelectedBillsTotal();
  }

  reopenReceivings() {
    if (confirm("Confirm the reopening of all selected receivings?")) {
      this.updateReceivingStatus(false);
    }
    this.updateSelectedReceivingsTotal();
  }

  updatePaymentStatus(paid: boolean) {
    let selectedBills = this.bills.filter(bill => bill.selected);
    selectedBills.forEach(b => {
      b.paid = paid;
      this.billsService.updateBill(b as any).subscribe();
      b.selected = false;
    });
    this.checkAllBillsState = false;
  }

  selectAllBills(select: boolean) {
    this.bills.forEach(b => b.selected = select);
  }

  selectAllReceivings(select: boolean) {
    this.receivings.forEach(b => b.selected = select);
  }

  onPreviousMonthClick() {
    if (this.selectedMonth == 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.loadBillsAndReceivings();
  }

  onNextMonthClick() {
    if (this.selectedMonth == 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.loadBillsAndReceivings();
  }

  onFilterMonth() {
    this.loadBillsAndReceivings();
  }

  onFilterYear() {
    if (this.selectedYear.toString().length === 4)
      this.loadBillsAndReceivings();
  }

  copyBills() {
    if (confirm("Do you want to copy all bills from this month to the next?")) {
      this.billsService.copyBills(this.selectedMonth, this.selectedYear).subscribe(_ => {
        this.toastrServie.success("Bills copied successfuly");
      });
    }
  }

  toggleSelectBills() {
    this.selectAllBills(!this.checkAllBillsState);
    this.updateSelectedBillsTotal()
  }

  toggleSelectReceivings() {
    this.selectAllReceivings(!this.checkAllReceivingsState);
    this.updateSelectedReceivingsTotal()
  }

  selectAllPaid() {
    this.checkAllBillsState = false;
    this.selectAllBills(false);
    this.bills.filter(b => b.paid).forEach(b => b.selected = true);
    this.updateSelectedBillsTotal()
  }

  selectAllOpenBills() {
    this.checkAllBillsState = false;
    this.selectAllBills(false);
    this.bills.filter(b => !b.paid).forEach(b => b.selected = true);
    this.updateSelectedBillsTotal()
  }

  selectAllReceived() {
    this.checkAllReceivingsState = false;
    this.selectAllReceivings(false);
    this.receivings.filter(r => r.received).forEach(r => r.selected = true);
    this.updateSelectedBillsTotal();
  }

  selectAllOpenReceivings() {
    this.checkAllReceivingsState = false;
    this.selectAllReceivings(false);
    this.receivings.filter(r => !r.received).forEach(r => r.selected = true);
    this.updateSelectedBillsTotal();
  }

  updateSelectedBillsTotal() {
    this.selectedBillsTotal = 0;
    this.bills.filter(b => b.selected).map(b => this.selectedBillsTotal += b.value);
  }

  updateSelectedReceivingsTotal() {
    this.selectedReceivingsTotal = 0;
    this.receivings.filter(b => b.selected).map(b => this.selectedReceivingsTotal += b.value);
  }
}

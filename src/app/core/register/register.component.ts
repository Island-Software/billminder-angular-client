import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Property to receive data from parent component
  // @Input() usersFromHomeComponent: any;
  // Property to send data to parent component
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  newUserForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16), this.matchValues('password')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', [Validators.required, Validators.email, this.matchValues('email')]),
    })
    this.newUserForm.controls['password'].valueChanges.subscribe({
      next: () => this.newUserForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  onUserText() {
    this.model.password = this.model.username;
  }


  register() {
    this.accountService.register(this.newUserForm.value).subscribe(response => {
      this.cancel();
    }, error => {
      console.log(error.error);
    });
  }

  cancel() {
    // Works like an event
    this.cancelRegister.emit(false);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.matchValues(),
      ]),
    });
  }
  matchValues(): ValidatorFn {
    return (control: AbstractControl) => {
      const regexp =
        /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/;
      return regexp.test(control?.value) ? null : { isMatching: true };
    };
  }
  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.cancel();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}

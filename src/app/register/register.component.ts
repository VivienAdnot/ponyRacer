import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationFailed: boolean;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  userForm: FormGroup;
  passwordForm: FormGroup;

  static passwordMatch(control: FormGroup) {
      const passwordValue = control.controls['password'].value;
      const confirmPasswordValue = control.controls['confirmPassword'].value;

      return (passwordValue !== confirmPasswordValue) ? { matchingError: true } : null;
  }

  static validYear(birthYearCtrl: FormControl) {
      const birthYear = birthYearCtrl.value;
      const limitYearMin = 1900;
      const limitYearMax = new Date().getFullYear();

      return (Number.isNaN(birthYear) || birthYear < limitYearMin || birthYear > limitYearMax) ? { invalidYear: true } : null;
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);

    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);

    this.passwordForm = this.formBuilder.group(
    {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
    },
    {
        validator: RegisterComponent.passwordMatch
    });

    this.birthYearCtrl = this.formBuilder.control('', [Validators.required, RegisterComponent.validYear]);

    this.userForm = this.formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  register() {
      this.userService.register(
          this.userForm.value.login,
          this.userForm.value.passwordForm.password,
          this.userForm.value.birthYear
      ).subscribe(
          () => {
              console.log("ok");
              this.router.navigate(['/'])
          },
          () => {
              console.log("no ok");
              this.registrationFailed = true;
          }
      );
  }
}

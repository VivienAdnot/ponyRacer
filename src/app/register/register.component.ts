import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  // confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.loginCtrl = this.formBuilder.control('', [Validators.required]);

      this.passwordCtrl = this.formBuilder.control('', Validators.required);

      this.birthYearCtrl = this.formBuilder.control('', Validators.required);

      this.userForm = this.formBuilder.group({
          login: this.loginCtrl,
          password: this.passwordCtrl,
          birthYear: this.birthYearCtrl
      });
  }

  register() {}
}

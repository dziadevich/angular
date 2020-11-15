import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forbiddenNameValidator} from "./shared/user-name.validator";
import {PasswordValidator} from "./shared/password.validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['Dmitry', [Validators.required, Validators.minLength(3),
        forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, {validator: PasswordValidator});
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }


  // registrationForm = new FormGroup({
  //   userName: new FormControl('Dmitry'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  loadAPI() {
    this.registrationForm.setValue({
      userName: 'Dmitry',
      password: 'pass',
      confirmPassword: 'pass',
      address: {
        city: 'Toronto',
        state: 'ON',
        postalCode: 'M5A 4E9'
      }
    })
    ;
  }
}

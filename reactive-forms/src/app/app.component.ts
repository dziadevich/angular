import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {forbiddenNameValidator} from "./shared/user-name.validator";
import {PasswordValidator} from "./shared/password.validator";
import {RegistrationService} from "./registration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
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
      }),
      alternateEmails: this.fb.array([])
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

  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(response => console.log('Success', response),
        error => console.error('Error!', error)
      );
  }
}

import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {forbiddenNameValidator} from "./shared/user-name.validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  registrationForm = this.fb.group({
    userName: ['Dmitry', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

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

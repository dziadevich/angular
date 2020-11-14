import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm = new FormGroup({
    userName: new FormControl('Dmitry'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    })
  });

  loadAPI() {
    this.registrationForm.setValue({
      userName: 'Dmitry',
      password: 'pass',
      confirmPassword: 'pass',
      address: {
        city:'Toronto',
        state:'ON',
        postalCode:'M5A 4E9'
      }
    })
    ;
  }
}

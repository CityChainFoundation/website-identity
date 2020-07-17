import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from 'src/shared/registration.service';

@Component({
  selector: 'app-register-sign-component',
  templateUrl: './sign.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterSignComponent implements OnInit, OnDestroy {

  constructor(public reg: RegistrationService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

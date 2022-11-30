import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from 'src/shared/registration.service';

@Component({
  selector: 'app-register-payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterPaymentComponent implements OnInit, OnDestroy {

  constructor(public reg: RegistrationService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

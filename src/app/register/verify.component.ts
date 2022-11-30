import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from 'src/shared/registration.service';

@Component({
  selector: 'app-register-verify-component',
  templateUrl: './verify.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterVerifyComponent implements OnInit, OnDestroy {

  constructor(public reg: RegistrationService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

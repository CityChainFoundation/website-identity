import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/shared/registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private sub: any;

  identityInput: string;



  constructor(private route: ActivatedRoute, public reg: RegistrationService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  lookupIdentity(identity: string) {

    this.http.get<any>(this.baseUrl + 'api/identity/' + identity).subscribe(result => {

      this.reg.registration.name = result.document.name;
      this.reg.registration.id = result.document.id;
      this.reg.registration.website = result.document.email;
      this.reg.registration.address = result.document.shortName;

      // This will show the input form.
      this.reg.registration.identity = result.document.id;

    }, error => console.error(error));

  }
}

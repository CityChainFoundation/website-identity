import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from 'src/shared/registration.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registry-component',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit, OnDestroy {

  private sub: any;

  address: string;
  identity: any;
  container: any;
  error: string;

  constructor(private route: ActivatedRoute, public reg: RegistrationService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];

      if (this.address) {
        this.lookupIdentity(this.address);
      }

      // this.announcement = this.announcements.filter(a => a.number === this.number)[0];
    });
  }

  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  lookupIdentity(identity: string) {

    this.http.get<any>(this.baseUrl + 'api/identity/' + identity).subscribe(result => {

      if (!result) {
        console.log('result is empty!!');
        this.error = 'Couldn\'t find any identity with that id.';
        return;
      }

      if (result.status === 401) {
        this.error = 'The service is currently not available, unauthorized"';
        return;
      }

      console.log('result is:');
      console.log(result);

      this.error = null;

      this.container = result;
      this.identity = result.content;

      // this.reg.registration.name = result.content.name;
      // this.reg.registration.id = result.content.id;
      // this.reg.registration.website = result.content.email;
      // this.reg.registration.address = result.content.shortName;

      // This will show the input form.
      // this.reg.registration.identity = result.content.id;

    }, error => console.error(error));

  }
}

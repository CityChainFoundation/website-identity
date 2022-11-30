import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from 'src/shared/registration.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import is from '@blockcore/did-resolver';
import { Resolver, DIDDocument, DIDResolutionResult } from 'did-resolver';
import { BlockcoreIdentityTools, BlockcoreIdentity } from '@blockcore/identity';

@Component({
  selector: 'app-registry-component',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
})
export class RegistryComponent implements OnInit, OnDestroy {
  private sub: any;

  address: string | undefined;
  identity: any;
  didDocument: DIDDocument | undefined;
  didResolutionResult: DIDResolutionResult | undefined;
  container: any;
  error: string | undefined;
  tools: BlockcoreIdentityTools;

  constructor(
    private route: ActivatedRoute,
    public reg: RegistrationService,
    public http: HttpClient
  ) {
    this.tools = new BlockcoreIdentityTools();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.address = params['address'];

      if (this.address) {
        this.lookupIdentity(this.address);
      }

      // this.announcement = this.announcements.filter(a => a.number === this.number)[0];
    });
  }

  capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async lookupIdentity(identity: string) {
    const resolver = new Resolver(is.getResolver());

    this.didResolutionResult = await resolver.resolve(identity);

    if (
      this.didResolutionResult.didResolutionMetadata.error != 'notFound' &&
      this.didResolutionResult.didDocument
    ) {
      if (
        this.didResolutionResult.didDocument &&
        this.didResolutionResult.didDocument.verificationMethod &&
        this.didResolutionResult.didDocument.verificationMethod[0] != null
      ) {
        const verificationMethod =
          this.didResolutionResult.didDocument.verificationMethod[0];
        this.identity = new BlockcoreIdentity(verificationMethod as any);
      }

      this.didDocument = this.didResolutionResult.didDocument;
      console.log(this.identity);
      console.log(this.didDocument);
    }

    // this.http.get<any>(this.baseUrl + 'api/identity/' + identity).subscribe(result => {

    //   if (!result) {
    //     console.log('result is empty!!');
    //     this.error = 'Couldn\'t find any identity with that id.';
    //     return;
    //   }

    //   if (result.status === 401) {
    //     this.error = 'The service is currently not available, unauthorized"';
    //     return;
    //   }

    //   console.log('result is:');
    //   console.log(result);

    //   this.error = undefined;

    //   this.container = result;
    //   this.identity = result.content;

    //   // this.reg.registration.name = result.content.name;
    //   // this.reg.registration.id = result.content.id;
    //   // this.reg.registration.website = result.content.email;
    //   // this.reg.registration.address = result.content.shortName;

    //   // This will show the input form.
    //   // this.reg.registration.identity = result.content.id;

    // }, error => console.error(error));
  }
}

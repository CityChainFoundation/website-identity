import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcements-component',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit, OnDestroy {

  announcement: any;
  announcements: any[];
  private number: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {

    this.announcements = [
      { name: 'Blockcore CC', id: 'entity:EblckFNouKATrLF5YbjxR1bsei2zwzdyLU', type: 'Registration', number: 4, currency: 'BTC', purpose: 'Blockchain Software Development', responsible: 'Dan' },
      { name: 'City Chain Labs CC', id: 'entity:Eab6MFNouKATrLF5YbjxR1bsei2zwzdyLU', type: 'Registration', number: 3, currency: 'CITY', address: 'Liberstad, Norway', purpose: 'Blockchain Software Development', responsible: 'Sondre Bjellås (id:PTe6MFNouKATrLF5YbjxR1bsei2zwzdyLU)' },
      { name: 'City Chain Foundation CC', id: 'entity:Ebb6MFNouKATrLF5YbjxR1bsei2zwzdyLU', type: 'Registration', number: 2, currency: 'CITY', purpose: 'Non-profit Foundation' },
      { name: 'City Chain Registry CC', id: 'entity:ETe6MFNouKATrLF5YbjxR1bsei2zwzdyLU', type: 'Registration', number: 1, currency: 'CITY', purpose: 'Registry Provider' },
    ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
      this.announcement = this.announcements.filter(a => a.number === this.number)[0];
    });
  }

  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

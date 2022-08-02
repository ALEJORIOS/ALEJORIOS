import { Animations } from './app.animations';
import { Component } from '@angular/core';
import { CovidService } from './services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.fromAbove,
    Animations.fade
  ]
})
export class AppComponent {

  showSelectBox: boolean = false;
  countries: string[] = [];
  currentCountry!: string;
  placeholder: string = 'Select a country'

  constructor(private covidService: CovidService){
   this.getCountries();
  }

  showOptions(){
    this.showSelectBox = !this.showSelectBox;
  }

  getCountries(){
    this.covidService.getCountries().subscribe(res => {
      res.forEach(country => {
        this.countries.push(country.Country)
      })
    })
  }

  selectCountry(country: string){
    this.currentCountry = country;
    this.showSelectBox = false;
    this.placeholder = country;
  }
}

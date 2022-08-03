import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Animations } from 'src/app/app.animations';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
  animations: [
    Animations.fromAbove,
    Animations.fade
  ]
})
export class InitComponent implements OnInit {

  showSelectBox: boolean = false;
  countries: Array<string> = [];
  currentCountry!: string;
  placeholder: string = 'Select a country'

  constructor(
    private covidService: CovidService,
    private router: Router) {
    this.getCountries();
   }

  ngOnInit(): void {
  }

  showOptions(){
    this.showSelectBox = !this.showSelectBox;
  }

  getCountries(){
    this.covidService.getCountries()
    .pipe(
      finalize(() => {
        this.countries.sort();
      })
    )
    .subscribe(res => {
      res.forEach(country => {
        this.countries.push(country.Country)
      })
    })
    
  }

  selectCountry(country: string){
    this.currentCountry = country;
    this.showSelectBox = false;
    this.placeholder = country;
    this.router.navigate(['/map',{countryOne: country}])
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import { CountryInterface } from '../pages/map/map.component';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  URL = 'https://api.covid19api.com/';
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCountries(){
    return this.httpClient.get<Country[]>(this.URL+'countries');
  }

  getCurrentData(country: string, date: Date){
    let dateFormatted = date.toISOString();
    return this.httpClient.get<Array<CountryInterface>>(this.URL + 'country/'+country+'?from=2020-01-01T00:00:00Z&to='+dateFormatted);
  }

  getData(country: string){
    return this.httpClient.get(this.URL + 'dayone/country/'+country);
  }
}

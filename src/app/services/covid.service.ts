import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  URL = 'https://api.covid19api.com/';
  constructor(private httpClient: HttpClient) {
  }

  getCountries(){
    return this.httpClient.get<Country[]>(this.URL+'countries');
  }
}

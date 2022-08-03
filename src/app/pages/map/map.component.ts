import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovidService } from 'src/app/services/covid.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DatePipe]
})
export class MapComponent implements OnInit {

  countries: string[];
  countryObject: CountryInterface[] = [];
  currentData!: any;
  selectedDateString!: string;
  selectedDate = new Date();

  constructor(
    private router: ActivatedRoute,
    private mapService: MapService,
    private covidService: CovidService,
    private datePipe: DatePipe) {
      this.selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
      this.selectedDate = new Date(Date.parse(this.selectedDateString));
      this.countries = this.mapService.checkParams(this.router.snapshot.paramMap);
  }

  ngOnInit(): void {
    this.countries.forEach(country => {
      this.covidService.getCurrentData(country, this.selectedDate)
      .subscribe( res => {
        this.currentData = res[res.length-1]
        console.log(this.currentData);
      });
    })

  }
}

export class CountryCurrentCases implements CountryInterface {
  totalCases!: number;
  active!: number;
  recovered!: number;
  deaths!: number;
  constructor(totalCases: number, active: number, recovered: number, deaths: number){
    this.totalCases = totalCases;
    this.totalCases = active;
    this.totalCases = recovered;
    this.totalCases = deaths;
  }
}

export interface CountryInterface {
  totalCases: number;
  active: number;
  recovered: number;
  deaths: number;
}
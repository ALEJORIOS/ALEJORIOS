import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovidService } from 'src/app/services/covid.service';
import { MapService } from 'src/app/services/map.service';
import { faCircleInfo, faCross, faHeadSideMask, faVirusCovid, faVirusCovidSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgChartsConfiguration } from 'ng2-charts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DatePipe]
})
export class MapComponent implements OnInit {

  icons!: Icons;
  countries: string[];
  countryObject: CountryInterface[] = [];
  currentData = new CountryCurrentCases();
  historicalData = new CountryHistoricalCases();
  selectedDateString!: string;
  selectedDate = new Date();
  loadingData: boolean = false;
  range: number = 10;


  constructor(
    private router: ActivatedRoute,
    private mapService: MapService,
    private covidService: CovidService,
    private datePipe: DatePipe) {
      this.setIcons();
      this.selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
      this.countries = this.mapService.checkParams(this.router.snapshot.paramMap);
  }

  ngOnInit(): void {
    this.selectedDate = new Date(Date.parse(this.selectedDateString));
    this.getData();
  }

  setIcons(){
    this.icons = {
      total: faVirusCovid,
      active: faHeadSideMask,
      recovered: faVirusCovidSlash,
      deaths: faCross,
      info: faCircleInfo
    }
  }

  seeInfo(){
    window.alert('Data provided by https://covid19api.com/ and developed by Alejandro Rios')
  }

  changeDate(){
    this.selectedDate = new Date(Date.parse(this.selectedDateString));
    this.getData();
  }

  getData(){
    this.loadingData = true;
    this.countries.forEach(country => {
      this.covidService.getCurrentData(country, this.selectedDate)
      .subscribe( res => {
        this.currentData = new CountryCurrentCases(res[res.length-1]);
        this.historicalData = new CountryHistoricalCases(this.getEveryNth(res, this.range));
        this.updateGraph();
        this.loadingData = false;
      });
    })
  }

  public lineChartData = {
    labels: ['2020-01-01','2022-08-04'],
    datasets: [
      {
        data: [0,0],
        label: '',
        fill: false,
        tension: 0,
        borderColor: 'black'
      }
    ]
  };

  public lineChartOptions = {
    responsive: false
  };
  public lineChartLegend = false;

  getEveryNth(arr: Array<any>, nth: number) {
    const result = [];  
    for (let i = 0; i < arr.length; i += nth) {
      result.push(arr[i]);
    }

    return result;
  }

  updateGraph(){
    let _lineChartData = {
      labels: this.historicalData.Date,
      datasets: [
        {
          data: this.historicalData.Confirmed,
          label: 'Confirmed',
          fill: false,
          tension: 0,
          borderColor: '#FF6B6B',
          pointRadius: 0
        },
        {
          data: this.historicalData.Active,
          label: 'Active',
          fill: false,
          tension: 0,
          borderColor: '#dfb922',
          pointRadius: 0,
          backgroundColor: '#dfb922'
        },
        {
          data: this.historicalData.Recovered,
          label: 'Recovered',
          fill: false,
          tension: 0,
          borderColor: '#6BCB77',
          pointRadius: 0
        },
        {
          data: this.historicalData.Deaths,
          label: 'Deaths',
          fill: false,
          tension: 0,
          borderColor: '#4D96FF',
          pointRadius: 0
        }
      ]
    }

    this.lineChartData = _lineChartData;
  }
}

export class CountryCurrentCases implements CountryInterface {
  Active!: number;
  City!: string;
  CityCode!: string;
  Confirmed!: number;
  Country!: string;
  CountryCode!: string;
  Date!: string;
  Deaths!: number;
  ID!: string;
  Lat!: string;
  Lon!: string;
  Province!: string;
  Recovered!: number;
  constructor(response?: CountryInterface){
    this.Active = response?.Active || 0;
    this.City = response?.City || '';
    this.CityCode = response?.CityCode || '';
    this.Confirmed = response?.Confirmed || 0;
    this.Country = response?.Country || '';
    this.CountryCode = response?.CountryCode || '';
    this.Date = response?.Date || '';
    this.Deaths = response?.Deaths || 0;
    this.ID = response?.ID || '';
    this.Lat = response?.Lat || '';
    this.Lon = response?.Lon || '';
    this.Province = response?.Province || '';
    this.Recovered = response?.Recovered || 0;
  }

}

export class CountryHistoricalCases {
  Active!: number[];
  City!: string[];
  CityCode!: string[];
  Confirmed!: number[];
  Country!: string[];
  CountryCode!: string[];
  Date!: string[];
  Deaths!: number[];
  ID!: string[];
  Lat!: string[];
  Lon!: string[];
  Province!: string[];
  Recovered!: number[];
  constructor(response?: CountryInterface[]) {
    this.Active = response?.map(elem => elem.Active) || [];
    this.City = response?.map(elem => elem.City) || [];
    this.CityCode = response?.map(elem => elem.CityCode) || [];
    this.Confirmed = response?.map(elem => elem.Confirmed) || [];
    this.Country = response?.map(elem => elem.Country) || [];
    this.CountryCode = response?.map(elem => elem.CountryCode) || [];
    this.Date = response?.map(elem => elem.Date.slice(0,10)) || [];
    this.Deaths = response?.map(elem => elem.Deaths) || [];
    this.ID = response?.map(elem => elem.ID) || [];
    this.Lat = response?.map(elem => elem.Lat) || [];
    this.Lon = response?.map(elem => elem.Lon) || [];
    this.Province = response?.map(elem => elem.Province) || [];
    this.Recovered = response?.map(elem => elem.Recovered) || [];
  }
}

export interface CountryInterface {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

export interface Icons {
  total: IconDefinition;
  active: IconDefinition;
  recovered: IconDefinition;
  deaths: IconDefinition;
  info: IconDefinition;
}
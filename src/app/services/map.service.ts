import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  checkParams(paramMap: ParamMap){
    if(this.checkVoid(paramMap)){
      return ['world']
    }else{
      return paramMap.getAll('countryOne')
    }
  }

  checkVoid(obj: ParamMap): boolean{
    return Object.keys(obj).length === 0;
  }
}

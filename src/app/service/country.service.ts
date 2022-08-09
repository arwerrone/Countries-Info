import { Injectable } from '@angular/core';
import {CountryData} from '../CountryData';

export interface Country{
  name: string,
  url: string,
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getAllCountries(){
    return CountryData.data;
  }

  /*getCountryByName(name: string){
    let temp = CountryData.data;

    temp.forEach((element,index) => {
      if(!element.name.startsWith(name)){
        temp.splice(index,1);
      }
    });

    return temp;
  }*/

}

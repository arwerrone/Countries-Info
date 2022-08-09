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


}

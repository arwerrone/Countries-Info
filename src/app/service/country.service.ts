import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryData} from '../CountryData';
import { Observable } from 'rxjs';

export interface Country{
  name: string,
  url: string,
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = 'https://travelbriefing.org/';

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return CountryData.data;
  }
  
  getCountryDetails(name: string): Observable<any> {
    /*
    return this.http.get(`${this.url}${name}?format=json`).pipe(
      map(data => data['names']));
    */
    return this.http.get(`${this.url}${name}?format=json`);

  }

}

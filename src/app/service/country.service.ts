import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryData} from '../CountryData';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface Country{
  name: string,
  url: string,
}

/*export interface CountryDetails{
  name: string,
  languages: string[],
  vaccines: string[],
  currency: string,
  neighbors: string[],
  voltage: string,
  emergency: string,
  advise: string
}*/

interface CountryToSave {
  name: string;
}


const COUNTRY_KEY = 'my-countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = 'https://travelbriefing.org/';
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  getAllCountries(){
    return CountryData.data;
  }
  
  getCountryDetails(name: string): Observable<any> {   
    return this.http.get(`${this.url}${name}?format=json`);
  }

  //STORAGE STUFF

  saveFavCountry(name: string){

    //this._storage.set(COUNTRY_KEY, name);

    this.storage.get(COUNTRY_KEY).then((countries: string[]) => {
      if(!countries || countries.length === 0){
        return this.storage.set(COUNTRY_KEY, [name]);

      }else{
        countries.push(name);
        return this.storage.set(COUNTRY_KEY, countries);

      }
    });


  }

  loadFavCountry(){
    return this.storage.get(COUNTRY_KEY);
  }

}

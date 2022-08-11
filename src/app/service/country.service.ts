import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryData} from '../CountryData';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface Country{
  name: string,
  url: string,
}

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

  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController, private router: Router) {
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
  async saveSuccess(){
    const alert = await this.alertController.create({
      header: 'Done!',
      message: 'Country Added To Favorite',
      //buttons: ['OK']
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }]
    });

    await alert.present();
  }

  saveFavCountry(name: string){

    this.storage.get(COUNTRY_KEY).then( async (countries: string[]) => {
      if(!countries || countries.length === 0){
        this.storage.set(COUNTRY_KEY, [name]);
        this.saveSuccess();

      }else{

        let ok = false;
        for (let i of countries){
          if(name == i){
            ok = true;
          }
        }

        if(!ok){
          countries.push(name);
          this.storage.set(COUNTRY_KEY, countries);
          this.saveSuccess();

        }else{

          const alert = await this.alertController.create({
            header: 'Error!',
            message: 'Country Already In Favorite',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['/home']);
              }
            }]
          });
      
          await alert.present();

        }

      }
    });


  }

  loadFavCountry(){
    return this.storage.get(COUNTRY_KEY);
  }

  deleteFromFav(country: string){

    return this.storage.get(COUNTRY_KEY).then((countries: string[]) => {
      if(!countries || countries.length === 0){
        return null;
      }

      let toKeep: string[] = [];

      for (let i of countries){
        if(i != country){
          toKeep.push(i);
        }
      }

      return this.storage.set(COUNTRY_KEY, toKeep);

    });

  }

}

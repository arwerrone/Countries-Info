import { Component } from '@angular/core';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  countryList: string[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(){
    this.loadCountryList();
  }
 
  ionViewWillEnter(){
    this.loadCountryList();
  }

  loadCountryList(){
    this.countryService.loadFavCountry().then(countries => {
      this.countryList = countries;
    });

  }

  removeCountry(name){
    this.countryService.deleteFromFav(name);
    this.loadCountryList();
    window.location.reload();
  }

  searchChanged(val: string){
    let temp = [];

    this.countryService.loadFavCountry().then(countries => {
      countries.forEach(countryName => {
        if(countryName.toLowerCase().startsWith(val.toLowerCase())){
          temp.push(countryName);
        }
      })
    });

    this.countryList = temp;

  }

}

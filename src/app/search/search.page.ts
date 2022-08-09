import { Component, OnInit } from '@angular/core';
import {Country, CountryService} from '../service/country.service';
//import {CountryData} from '../CountryData';

/*interface Country{
  name: string,
  url: string,
}*/

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  listOfCountries: Country[] = [];
  filterTerm: string = '';

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries(){
    this.listOfCountries = this.countryService.getAllCountries();
  }


}

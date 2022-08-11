import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Country, CountryService} from '../service/country.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  listOfCountries: Country[] = [];
  filterTerm: string = '';
  CountryDetails: Observable<any>;


  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries(){
    this.listOfCountries = this.countryService.getAllCountries();
  }

  
}

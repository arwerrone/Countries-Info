import { Component, OnInit } from '@angular/core';
import {CountryData} from '../CountryData';

interface Country{
  name: string,
  url: string,
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  listOfCountries: Country[] = [];


  constructor() { }

  ngOnInit() {
    this.listOfCountries = CountryData.data;

  }

  searchChanged(){
    
  }

}

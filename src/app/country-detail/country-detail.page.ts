import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {

  CountryDet: Observable<any>;
  //countryDetails: CountryDetails;
  countryDetails: any;

  //toFav: CountryDetails;

  constructor(private countryService: CountryService, private activated_route: ActivatedRoute) { }

  ngOnInit() {

    this.activated_route.params.subscribe((data: Params) => {
      const CName = data['country_name'];
      //console.log(CName);
      
      this.CountryDet = this.countryService.getCountryDetails(CName);
      //console.log(this.CountryDet);

    })

    this.CountryDet.subscribe(data => {
      //console.log(data.names.name);
      //console.log(typeof(data.names.name));
      this.countryDetails = data;

    });


  }

  addFavorites(){
    this.countryService.saveFavCountry(this.countryDetails.names.name);

  }


}

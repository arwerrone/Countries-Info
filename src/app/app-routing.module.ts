import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'search',
    children: [{
      path:'',
      loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
    },{
      path:':country_name',
      loadChildren: () => import('./country-detail/country-detail.module').then( m => m.CountryDetailPageModule)
    }]
    //loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  /*{
    path: 'country-detail',
    loadChildren: () => import('./country-detail/country-detail.module').then( m => m.CountryDetailPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

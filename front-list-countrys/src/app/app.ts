import { Component } from '@angular/core';

import { CountrySearchPage } from './pages/country-search-page/country-search-page';

@Component({
  selector: 'app-root',
  imports: [CountrySearchPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import { Country, CountryApiListResponse, CountryApiResponse } from '../models/country-model';

@Injectable({
  providedIn: 'root'
})

export class CountryService{
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.restcountries.com/countries/v5';
  private readonly apiKey = 'rc_live_f4f98c97020649cfb73de1f08749c63';
  private readonly responseFields = [
    'names',
    'capitals',
    'region',
    'subregion',
    'population',
    'flag',
    'codes'
  ].join(',');
  private readonly headers = {
    Authorization: `Bearer ${this.apiKey}`
  };

getCountries(): Observable<Country[]>{
  const requests = [0, 100, 200].map((offset) =>
    this.http.get<CountryApiListResponse>(
      `${this.apiUrl}?limit=100&offset=${offset}&response_fields=${this.responseFields}`,
      { headers: this.headers }
    )
  );

  return forkJoin(requests)
  .pipe(
    map((responses) =>
      responses
        .flatMap((response) => response.data.objects)
        .map((country) => this.mapCountry(country))
    ),
    catchError(() => 
      throwError(() => new Error('Nao foi possivel carregar os paises.'))
  ));
};

  searchCountries(term: string): Observable<Country[]>{
    const searchTerm = term.trim();

    if(!searchTerm){
      return this.getCountries();
    };

    return this.http
      .get<CountryApiListResponse>(
        `${this.apiUrl}?q=${encodeURIComponent(searchTerm)}&limit=100&response_fields=${this.responseFields}`,
        { headers: this.headers }
      )
      .pipe(
        map((response) => response.data.objects.map((country) => this.mapCountry(country))),
        catchError(() =>
          throwError(() => new Error('Nenhum pais encontrado para essa busca.'))
        )
      );
  };

  private mapCountry(country: CountryApiResponse): Country {
    const portugueseName = country.names.translations?.por?.common ?? country.names.common;
    const flagUrl = country.flag.url_svg
      || country.flag.url_png
      || this.getFlagUrlByCode(country.codes?.alpha_2);

    return {
      name: portugueseName,
      officialName: country.names.official,
      capital: country.capitals?.map((capital) => capital.name).join(', ') ?? 'Sem Capital',
      region: country.region,
      subregion: country.subregion ?? 'Sem sub-regiao',
      population: country.population,
      flagUrl,
      flagAlt: country.flag.description || `Bandeira de ${portugueseName}`,
      portugueseName
    };

  };

  private getFlagUrlByCode(code?: string): string {
    if (!code) {
      return '';
    }

    return `https://flags.restcountries.com/v5/svg/${code.toLowerCase()}.svg`;
  }

};

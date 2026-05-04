import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Country, CountryApiResponse } from '../models/country-model';

@Injectable({
  providedIn: 'root'
})

export class CountryService{
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://restcountries.com/v3.1';
  private readonly fields = [
    'name',
    'capital',
    'region',
    'subregion',
    'population',
    'flags'
  ].join(',');

getCountries(): Observable<Country[]>{
  return this.http
  .get<CountryApiResponse[]>(`${this.apiUrl}/all?fields=${this.fields}`)
  .pipe(
    map((countries) => countries.map((country) => this.mapCountry(country))),
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
      .get<CountryApiResponse[]>(
        `${this.apiUrl}/name/${encodeURIComponent(searchTerm)}?fields=${this.fields}`
      )
      .pipe(
        map((countries) => countries.map((country) => this.mapCountry(country))),
        catchError(() =>
          throwError(() => new Error('Nenhum pais encontrado para essa busca.'))
        )
      );
  };

  private mapCountry(country: CountryApiResponse): Country {
    return {
      name: country.name.common,
      officialName: country.name.official,
      capital: country.capital?.join(', ') ?? 'Sem Capital',
      region: country.region,
      subregion: country.subregion ?? 'Sem sub-regiao',
      population: country.population,
      flagUrl: country.flags.svg || country.flags.png,
      flagAlt: country.flags.alt ?? `Bandeira de ${country.name.common}`

    };

  };

};


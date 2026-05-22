import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryService} from '../../services/country.service'
import {Country} from '../../models/country-model'
import { SearchForm } from '../../components/search-form/search-form';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'app-country-search-page',
    standalone: true,
    imports: [CommonModule, FormsModule, SearchForm],
    templateUrl: './country-search-page.html',
    styleUrl: './country-search-page.css'
})

export class CountrySearchPage implements OnInit{

    countries: Country[] = [];
    isLoading: boolean = false; 
    errorMessage: string | null = null;

    constructor(private countryService: CountryService, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
        this.getCountries();
    }

    getCountries(): void{
        this.isLoading = true;
        this.errorMessage = null;


        this.countryService.getCountries().subscribe({
            next: (data) => {
                console.log(data)
                this.countries = data;
                this.isLoading = false;

                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Falha ao recuperar os paises';
                this.isLoading = false;
            }            
        });
    }


    typedText: string = ''

    textoVindoSearch(searchSubmit: string): void {
        this.typedText = searchSubmit;
        this.getCountriesForName();
    }

    getCountriesForName(){

        this.isLoading = true;
        this.errorMessage = null;

        if(this.typedText.trim() === ""){
            this.getCountries()
        }
        else {
            this.countryService.searchCountries(this.typedText.trim()).subscribe({
                next: (country: Country[]) => {
                    console.log(country)
                    this.countries = country;
                    this.isLoading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.errorMessage = "Falha ao recuperar o pais digitado";
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }
            })
        }
    }
}
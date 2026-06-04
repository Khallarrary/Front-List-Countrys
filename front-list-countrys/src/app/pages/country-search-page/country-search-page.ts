import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryService} from '../../services/country.service'
import {Country} from '../../models/country-model'
import { SearchForm } from '../../components/search-form/search-form';
import { CountryQuiz } from '../../components/country-quiz/country-quiz';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-country-search-page',
    standalone: true,
    imports: [CommonModule, FormsModule, SearchForm, CountryQuiz],
    templateUrl: './country-search-page.html',
    styleUrl: './country-search-page.css'
})

export class CountrySearchPage implements OnInit{

    countries: Country[] = [];
    isLoading: boolean = false; 
    errorMessage: string | null = null;
    viewMode: 'list' | 'quiz' = "list";
    currentPage: number = 1;
    itemsPerPage: number = 12;
    
    constructor(private countryService: CountryService, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
        this.getCountries();
    }

    showList(): void{
        this.viewMode = "list"
    }

    showQuiz(): void{
        this.viewMode = "quiz"
    }

    get paginatedCountries(): Country[]{
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const countriesOnThePage = this.countries.slice(startIndex, endIndex);

        return countriesOnThePage;
    }

    get totalPages(): number{
        const totalPages = this.countries.length / this.itemsPerPage;
        return Math.ceil(totalPages);
    }

    nextPage(): void{
        if(this.currentPage < this.totalPages){
            this.currentPage += 1;
        }
    }

    previousPage(): void{
        if(this.currentPage > 1){
            this.currentPage -= 1;
        }
    }
    
    getCountries(): void{
        this.startLoading();

        this.countryService.getCountries().subscribe({
            next: (countries) => {
                this.countries = countries;
                this.currentPage = 1;
                this.stopLoading();
            },
            error: () => {
                this.errorMessage = "Falha ao recuperar os paises";
                this.stopLoading();
            }            
        });
    }

    onSearch(searchText: string): void {
        this.searchCountriesForName(searchText);
    }

    private searchCountriesForName(searchText: string): void{
        this.startLoading();

        const trimmedSearchText:string = searchText.trim();

        if(trimmedSearchText === ""){
            this.getCountries();
            return;
        }
        this.countryService.searchCountries(trimmedSearchText).subscribe({
            next: (countries: Country[]) => {
                this.countries = countries;
                this.currentPage = 1;
                this.stopLoading();
            },
            error: () => {
                this.errorMessage = "Falha ao recuperar o pais digitado";
                this.stopLoading();
            }
        });      
    }

    private startLoading(): void {
        this.isLoading = true;
        this.errorMessage = null;
    }

    private stopLoading(): void {
        this.isLoading = false;
        this.cdr.detectChanges();
    }

}
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country } from '../../models/country-model';

@Component({
    selector: 'app-country-quiz',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './country-quiz.html',
    styleUrl: './country-quiz.css'
})

export class CountryQuiz{

    @Input() countries: Country[] = []

    randomCountry: Country | null = null
    guessText: string = ''
    feedbackMessage: string | null = null

    sortCountry(): void {

        this.feedbackMessage = null;

        if(this.countries.length === 0){
            return;
        }

        const indice: number = Math.floor(Math.random() * this.countries.length);

        this.randomCountry = this.countries[indice];
    }
    
    checkAnswer(): void{
        if(this.randomCountry === null){
            return
        }

        if(this.randomCountry.name.trim().toLowerCase() === this.guessText.trim().toLowerCase()){
            this.feedbackMessage = "Acertou!!!"
        } else {
            this.feedbackMessage = "Errou!!! Tente novamente."
        }
    }

}
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

    private normalizeAnswer(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-]/g, ' ')
        .replace(/\s+/g, ' ');
}
    
    checkAnswer(): void{

        if (this.randomCountry === null) 
        {
            return;
        }

        const guess = this.normalizeAnswer(this.guessText);
        const englishName = this.normalizeAnswer(this.randomCountry.name);
        const portugueseName = this.normalizeAnswer(this.randomCountry.portugueseName);
        const officialName = this.normalizeAnswer(this.randomCountry.officialName);

        if (
        guess === englishName ||
        guess === portugueseName ||
        guess === officialName
        ) {
        this.feedbackMessage = 'Acertou!!!';
        } else {
        this.feedbackMessage = `Errou!!! Pais correto ${this.randomCountry.portugueseName}. Tente novamente.`;
        }
    }

}
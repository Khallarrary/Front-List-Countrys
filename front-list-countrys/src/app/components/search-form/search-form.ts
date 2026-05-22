import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-form.html',
    styleUrl: './search-form.css'
})

export class SearchForm{
    typedText: string = '';
    @Output() sendNameForPage = new EventEmitter<string>();

    searchSubmit(): void{
        this.sendNameForPage.emit(this.typedText);
    }

}

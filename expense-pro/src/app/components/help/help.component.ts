import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Suggestion } from '../../../models/suggestion.model';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [ CommonModule, AsyncPipe, RouterModule ],
    templateUrl: './help.component.html',
    styleUrl: './help.component.css'
})

export class HelpComponent {

    suggestionList$ = this.loadSuggestions();

    suggestionLiked: boolean = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {

    }

    // [HttpGet]
    loadSuggestions(): Observable<Suggestion[]> {
        return this.http.get<Suggestion[]>("https://localhost:7265/api/Suggestions");
    }

}
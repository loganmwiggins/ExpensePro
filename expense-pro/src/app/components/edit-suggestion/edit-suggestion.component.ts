import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-suggestion',
    standalone: true,
    imports: [ CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './edit-suggestion.component.html',
    styleUrl: './edit-suggestion.component.css'
})
export class EditSuggestionComponent {

    suggestionId!: string | null;

    suggestionForm = new FormGroup({
        message: new FormControl<string>(""),
    });

    updateSuggestion(): void {

    }
}
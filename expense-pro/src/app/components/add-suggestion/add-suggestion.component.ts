import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { Suggestion } from '../../../models/suggestion.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-add-suggestion',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './add-suggestion.component.html',
    styleUrl: './add-suggestion.component.css'
})
export class AddSuggestionComponent {

    currentUser$!: Observable<User>;

    suggestionId!: string | null;
    suggestion$!: Observable<Suggestion>;
    userUsername!: string;

    suggestionForm = new FormGroup({
        username: new FormControl<string>(""),
        message: new FormControl<string>("")
    });

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        // Current user
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call   
        if (this.currentUser$ !== null) {
            this.currentUser$.subscribe(user => {
                this.suggestionForm.patchValue({
                    username: user.username
                });
            });
        }

        // Existing suggestion
        const id = this.route.snapshot.paramMap.get('id');
        this.suggestionId = id;

        if (id !== null) { this.loadSuggestion(id); }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    private getSuggestionById(id: string): Observable<Suggestion> {
        return this.http.get<Suggestion>(`https://localhost:7265/api/Suggestions/${id}`);
    }

    private loadSuggestion(id: string): void {
        this.suggestion$ = this.getSuggestionById(id);

        // Fill form with retrieved observable data
        this.suggestion$.subscribe(suggestion => {
            this.suggestionForm.patchValue({
                username: suggestion.username,
                message: suggestion.message
            });
        });
    }

    updateSuggestion(): void {
        // What to do if form is not valid
        if (this.suggestionForm.value.message == null || this.suggestionForm.value.message == "") {
            this.toast.danger("Message is required.", "ERROR", 5000);
            return;
        }

        // If suggestionId is not null/empty
        if (this.suggestionId) {
            // Edit existing suggestion
            const updatedSuggestion = this.suggestionForm.value;

            this.http.put(`https://localhost:7265/api/Suggestions/${this.suggestionId}`, updatedSuggestion)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/help']); // Redirect to the help page
                        this.toast.success("Suggestion updated successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error updating suggestion.", "ERROR", 5000);
                    }
                });
        } else {
            // Add new suggestion
            const newSuggestion = { ...this.suggestionForm.value };

            this.http.post(`https://localhost:7265/api/Suggestions`, newSuggestion)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/help']); // Redirect to the help page
                        this.toast.success("Suggestion added successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error adding suggestion.", "ERROR", 5000);
                    }
                });
        }
    }
}
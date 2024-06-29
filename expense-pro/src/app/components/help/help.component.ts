import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { Suggestion } from '../../../models/suggestion.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        RouterModule,
        HttpClientModule
    ],
    templateUrl: './help.component.html',
    styleUrl: './help.component.css'
})

export class HelpComponent {

    currentUser$!: Observable<User>;
    userIsAdmin: boolean = false;

    suggestionList$ = this.loadSuggestions();

    constructor(private http: HttpClient, private toast: NgToastService) {}

    ngOnInit(): void {
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    contactSupport(): void { window.location.href = "mailto:loganmwiggins1@gmail.com"; }

    // [HttpGet]
    loadSuggestions(): Observable<Suggestion[]> {
        return this.http.get<Suggestion[]>("https://localhost:7265/api/Suggestions");
    }

    // [HttpDelete]
    deleteSuggestion(id: number) {
        if (window.confirm("Are you sure you want to delete this suggestion?")) {  // Confirmation request
            this.http.delete(`https://localhost:7265/api/Suggestions/${id}`)
              .subscribe({
                  // Will only run when we get a success response from API
                  next: (response) => {
                      this.suggestionList$ = this.loadSuggestions();
                      this.toast.success("Suggestion deleted successfully.", "SUCCESS", 5000);
                  }
              });
        }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill variables with observable data
            if (user.role == "Admin") {
                this.userIsAdmin = true;
            }
        })
    }
}
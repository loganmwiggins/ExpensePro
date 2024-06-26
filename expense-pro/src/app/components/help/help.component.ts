import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

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
    userId!: number;

    suggestionList$ = this.loadSuggestions();
    userUpvotes: number[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Current user
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call   
        // if (this.currentUser$ !== null) {
        //     this.currentUser$.subscribe(user => {
        //         this.userId = user.id;
        //     });
        // }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    contactSupport(): void { window.location.href = "mailto:loganmwiggins1@gmail.com"; }

    // [HttpGet]
    loadSuggestions(): Observable<Suggestion[]> {
        return this.http.get<Suggestion[]>("https://localhost:7265/api/Suggestions");
    }

    loadUserUpvotes(): void {
        this.currentUser$.subscribe(user => {
            this.http.get<any[]>(`https://localhost:7265/api/Upvotes/user/${user.id}`)
                .pipe(map(upvotes => upvotes.map(upvote => upvote.suggestionId)))
                .subscribe(upvotes => this.userUpvotes = upvotes);
        });
    }

    isUpvoted(suggestionId: number): boolean {
        return this.userUpvotes.includes(suggestionId);
    }

    toggleUpvote(suggestionId: number): void {
        const isUpvoted = this.isUpvoted(suggestionId);

        this.currentUser$.subscribe(user => {
            this.http.post('https://localhost:7265/api/Upvotes/toggle', { suggestionId, userId: user.id })
                .subscribe(() => {
                    if (isUpvoted) {
                        this.userUpvotes = this.userUpvotes.filter(id => id !== suggestionId);
                    } else {
                        this.userUpvotes.push(suggestionId);
                    }

                    this.suggestionList$ = this.loadSuggestions();
                });
        });
    }
}
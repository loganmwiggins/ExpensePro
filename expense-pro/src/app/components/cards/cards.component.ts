import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { User } from '../../../models/user.model';
import { CreditCard } from '../../../models/credit-card.model';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [ RouterModule, AsyncPipe, HttpClientModule ],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css'
})

export class CardsComponent {

    cardList$ = this.loadCardList();
    currentUser$!: Observable<User>;

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    constructor(
        private http: HttpClient, 
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        // Sets currentUser observable with API call
        this.currentUser$ = this.getCurrentUser();  
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    // [HttpGet]
    loadCardList(): Observable<CreditCard[]> {
        return this.http.get<CreditCard[]>("https://localhost:7265/api/CreditCard");
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill variables with observable data
            // this.userYearlyIncome = user.income;
            // this.userMonthlyIncome = this.userYearlyIncome / 12;
        })
    }

    // [HttpDelete]
    deleteCard(id: string): void {
        if (window.confirm("Are you sure you want to delete this credit card?")) {  //Confirmation request
            this.http.delete(`https://localhost:7265/api/CreditCard/${id}`)
              .subscribe({
                    // Will only run when we get a success response from API
                    next: (response) => {
                        this.cardList$ = this.loadCardList();
                        this.toast.success("Card deleted successfully.", "SUCCESS", 5000);
                        this.ngOnInit();
                    }
              });
        }
    }
}
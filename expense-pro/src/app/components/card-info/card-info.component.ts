import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { CreditCard } from '../../../models/credit-card.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-card-info',
    standalone: true,
    imports: [ CommonModule, RouterModule, HttpClientModule ],
    templateUrl: './card-info.component.html',
    styleUrl: './card-info.component.css'
})

export class CardInfoComponent {

    cardId!: string | null;
    card$!: Observable<CreditCard>;

    targetDate!: number;
    dayOfMonth = new Date().getDate();

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    currencyFormatterND = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });

    constructor(private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.cardId = id;

        if (id !== null) { this.loadCard(id); }

        // Get current user ID
        // this.userStore.getUserIdFromStore()
        //     .subscribe(val => {
        //         const userIdFromToken = this.auth.getUserIdFromToken();
        //         this.userId = val || userIdFromToken;
        //     })
    }

    private getCardById(id: string): Observable<CreditCard> {
        return this.http.get<CreditCard>(`https://localhost:7265/api/CreditCard/${id}`);
    }

    private loadCard(id: string): void {
        this.card$ = this.getCardById(id);

        // Use this subscription to get any info from the card
        this.card$.subscribe(card => {
            // Extract nums from statement date and set to targetDate var
            this.targetDate = Number((card.statementDate).match(/\d+/g)?.join(""));
        });
    }

    daysUntilTarget(dayOfMonth: number, targetDate: number): number {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-based: 0 = January, 11 = December
    
        // Current date
        const currentDate = new Date(year, month, dayOfMonth);
    
        // Target date (initially assume it's in the same month)
        let target = new Date(year, month, targetDate);
    
        // If the target date has already passed in the current month, move it to the next month
        if (targetDate <= dayOfMonth) {
            target = new Date(year, month + 1, targetDate);
        }
    
        // Calculate the difference in milliseconds and convert to days
        const diffMilliseconds = target.getTime() - currentDate.getTime();
        const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24);
    
        return Math.ceil(diffDays); // Round up to ensure full days are counted
    }
}
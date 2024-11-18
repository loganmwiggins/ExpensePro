import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CreditCard } from '../../../models/credit-card.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-card-info',
    standalone: true,
    imports: [ CommonModule, HttpClientModule ],
    templateUrl: './card-info.component.html',
    styleUrl: './card-info.component.css'
})

export class CardInfoComponent {

    cardId!: string | null;
    card$!: Observable<CreditCard>;

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

        // this.card$.subscribe(card => {
     
        // });
    }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { CreditCard } from '../../../models/credit-card.model';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
    selector: 'app-edit-card',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule
    ],
    templateUrl: './edit-card.component.html',
    styleUrl: './edit-card.component.css'
})

export class EditCardComponent {

    userId!: string;
    cardId!: string | null;
    card$!: Observable<CreditCard>;

    editCardForm = new FormGroup({
        cardName: new FormControl<string>(""),
        cardIssuer: new FormControl<string>(""),
        cardImage: new FormControl<string>(""),
        creditLimit: new FormControl<number>(0),
        annualFee: new FormControl<number>(0),
        annualFeeDate: new FormControl<string>(""),
        statementDate: new FormControl<string>(""),
        paymentDate: new FormControl<string>(""),
        dueDate: new FormControl<string>(""),
        notes: new FormControl<string>("")
    });

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private userStore: UserStoreService,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.cardId = id;

        if (id !== null) { this.loadCard(id); }

        // Get current user ID
        this.userStore.getUserIdFromStore()
            .subscribe(val => {
                const userIdFromToken = this.auth.getUserIdFromToken();
                this.userId = val || userIdFromToken;
            })
    }

    private getCardById(id: string): Observable<CreditCard> {
        return this.http.get<CreditCard>(`https://localhost:7265/api/CreditCard/${id}`);
    }

    private loadCard(id: string): void {
        this.card$ = this.getCardById(id);

        // Fill expense form with retrieved observable data
        this.card$.subscribe(card => {
            this.editCardForm.patchValue({
                cardName: card.cardName,
                cardIssuer: card.cardIssuer,
                cardImage: card.cardImage,
                creditLimit: card.creditLimit,
                annualFee: card.annualFee,
                annualFeeDate: card.annualFeeDate,
                statementDate: card.statementDate,
                paymentDate: card.paymentDate,
                dueDate: card.dueDate,
                notes: card.notes
            });
        });
    }

    updateCard(): void {
        // What to do if form is not valid
        if (
            this.editCardForm.value.cardName == null || this.editCardForm.value.cardName == ""
            || this.editCardForm.value.cardIssuer == null || this.editCardForm.value.cardIssuer == ""
            || this.editCardForm.value.annualFee == null || this.editCardForm.value.annualFee == 0
            || this.editCardForm.value.creditLimit == null
        ) {
            this.toast.warning("Card Name, Issuer, and Annual Fee fields are required.", "", 5000);
            return;
        }

        // If cardId is not null/empty
        if (this.cardId) {
            // Edit existing card
            const updatedCard = this.editCardForm.value;

            this.http.put(`https://localhost:7265/api/CreditCard/${this.cardId}`, updatedCard)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/cards']); // Redirect to the cards list
                        this.toast.success("Card updated successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error updating card.", "ERROR", 5000);
                    }
                });
        } else {
            // Add new card
            const newCard = { ...this.editCardForm.value, UserId: this.userId };

            this.http.post(`https://localhost:7265/api/CreditCard`, newCard)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/cards']); // Redirect to the cards list
                        this.toast.success("Card added successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error adding card.", "ERROR", 5000);
                    }
                });
        }
    }

    // [HttpDelete]
    deleteCard(): void {
        if (window.confirm("Are you sure you want to delete this credit card?")) {  //Confirmation request
            this.http.delete(`https://localhost:7265/api/CreditCard/${this.cardId}`)
              .subscribe({
                    // Will only run when we get a success response from API
                    next: (response) => {
                        this.router.navigate(['/cards']); // Redirect to the card list
                        this.toast.success("Card deleted successfully.", "SUCCESS", 5000);
                        this.ngOnInit();
                    }
              });
        }
    }
}
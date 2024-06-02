import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [ CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
    http = inject(HttpClient);

    expenseId!: string;
    expense$!: Observable<Expense>;

    editExpenseForm = new FormGroup({
        name: new FormControl<string>(""),
        type: new FormControl<string>(""),
        icon: new FormControl<string>("/assets/icons/expense-icons/usd-circle.svg"),
        cost: new FormControl<number>(0),
        paymentDate: new FormControl<string>("")
    });

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id !== null) {
            this.expenseId = id;
            this.loadExpense(this.expenseId);
        }
        else { this.expenseId = ''; }
    }

    private getExpenseById(id: string): Observable<Expense> {
        return this.http.get<Expense>(`https://localhost:7265/api/Expenses/${id}`);
    }

    private loadExpense(id: string): void {
        this.expense$ = this.getExpenseById(id);
        this.expense$.subscribe(expense => {
            this.editExpenseForm.patchValue({
                name: expense.name,
                type: expense.type,
                icon: expense.icon,
                cost: expense.cost,
                paymentDate: expense.paymentDate
            });
        });
    }

    updateExpense(): void {
        if (
            this.editExpenseForm.value.icon == null
            || this.editExpenseForm.value.name == null || this.editExpenseForm.value.name == ""
            || this.editExpenseForm.value.type == null || this.editExpenseForm.value.type == ""
            || this.editExpenseForm.value.cost == null || this.editExpenseForm.value.cost == 0
        ) {
            alert("Icon, Name, Type, and Cost fields are required.");
            this.expense$.subscribe(expense => {
                this.editExpenseForm.patchValue({
                    name: expense.name,
                    type: expense.type,
                    icon: expense.icon,
                    cost: expense.cost,
                    paymentDate: expense.paymentDate
                });
            });

        }
        else {
            const updatedExpense = this.editExpenseForm.value;

            this.http.put(`https://localhost:7265/api/Expenses/${this.expenseId}`, updatedExpense)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/']); // Redirect to the dashboard
                        alert("Expense updated successfully.");
                    },
                    error: (error) => {
                        alert("Error updating expense: " + error);
                    },
                    // complete: () => {
                    //     alert("Update request completed");
                    // }
                });
        }
    }
}
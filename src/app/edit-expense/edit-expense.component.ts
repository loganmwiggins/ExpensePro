import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    expenseService = inject(ExpenseService);
    expense: Expense | undefined;

    constructor() {
        const expenseId = Number(this.route.snapshot.params["id"]);
        this.expense = this.expenseService.getExpenseById(expenseId);
    }
}
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
    @Input() expense!: Expense;

    // Expenses array, empty var
    expenseList: Expense[] = [];

    // Inject expense list data from service
    expenseService: ExpenseService = inject(ExpenseService);

    // Populate local expense list with data from service
    constructor() {
        this.expenseList = this.expenseService.getAllExpenses();
    }
}
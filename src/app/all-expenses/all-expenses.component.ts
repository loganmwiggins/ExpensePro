import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-all-expenses',
    standalone: true,
    imports: [ CommonModule, HttpClientModule, RouterModule, AsyncPipe ],
    templateUrl: './all-expenses.component.html',
    styleUrl: './all-expenses.component.css'
})
export class AllExpensesComponent {

    http = inject(HttpClient);  //Enables calls to API
    
    expenseList$ = this.getExpenses();
    monthlyExpenses: Expense[] = [];
    yearlyExpenses: Expense[] = [];

    totalMonthlyCost: number = 0;
    totalYearlyCost: number = 0;
    totalExpenseCost: number = 0;

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    ngOnInit(): void {
        this.expenseList$.subscribe(expenses => {
            this.monthlyExpenses = expenses.filter(expense => expense.type === "Monthly");
            this.yearlyExpenses = expenses.filter(expense => expense.type === "Yearly");
            this.calculateTotalExpenseCost();
        });
    }

    deleteExpense(id: string) {
        this.http.delete(`https://localhost:7265/api/Expenses/${id}`)
            .subscribe({
                // Will only run when we get a success response from API
                next: (response) => {
                    this.expenseList$ = this.getExpenses();
                    // alert("Expense deleted successfully.");
                    this.ngOnInit();
                }
            });
    }

    private getExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>("https://localhost:7265/api/Expenses");
    }

    calculateTotalExpenseCost(): void {
        this.totalMonthlyCost = this.monthlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);
        this.totalYearlyCost = this.yearlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);
        this.totalExpenseCost = this.totalMonthlyCost + this.totalYearlyCost;
    }

}
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
    
    expenseList$ = this.loadExpenses();
    monthlyExpenses: Expense[] = [];
    yearlyExpenses: Expense[] = [];

    originalExpenses: Expense[] = [];  // Store the original order of expenses
    sortedExpenses: Expense[] = [];

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
            this.originalExpenses = [...expenses];  // Save the original order
            this.sortedExpenses = [...expenses];  // Initialize sortedExpenses with all expenses
            this.calculateTotalExpenseCost();
        });
    }

    deleteExpense(id: string) {
        if (window.confirm("Are you sure you want to delete this expense?")) {  //Confirmation request
            this.http.delete(`https://localhost:7265/api/Expenses/${id}`)
              .subscribe({
                  // Will only run when we get a success response from API
                  next: (response) => {
                      this.expenseList$ = this.loadExpenses();
                      // alert("Expense deleted successfully.");
                      this.ngOnInit();
                  }
              });
        }
        
    }

    loadExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>("https://localhost:7265/api/Expenses");
    }

    calculateTotalExpenseCost(): void {
        this.totalMonthlyCost = this.monthlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);
        this.totalYearlyCost = this.yearlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);
        this.totalExpenseCost = this.totalMonthlyCost + this.totalYearlyCost;
    }

    sortExpenses(event: Event): void {
        const sortOption = (event.target as HTMLSelectElement).value;

        switch (sortOption) {
            case 'default':   //Default (Order Added)
                this.sortedExpenses = [...this.originalExpenses];
                break;
            case 'name-asc':  //Name (A-Z)
                this.sortedExpenses.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'cost-asc':  //Cost (Low to High)
                this.sortedExpenses.sort((a, b) => a.cost - b.cost);
                break;
            case 'cost-desc': //Cost (High to Low)
                this.sortedExpenses.sort((a, b) => b.cost - a.cost);
                break;
            // case 'paymentDate-asc': //Payment Date (Earliest First)
            //     this.sortedExpenses.sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime());
            //     break;
            // case 'paymentDate-desc':  //Payment Date (Latest First)
            //     this.sortedExpenses.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
            //     break;
            case 'type-asc':  //Type (Monthly to Yearly)
                this.sortedExpenses.sort((a, b) => a.type.localeCompare(b.type));
                break;
            case 'type-desc':  //Type (Yearly to Monthly)
                this.sortedExpenses.sort((a, b) => b.type.localeCompare(a.type));
                break;
            default:
                break;
        }
    }
}
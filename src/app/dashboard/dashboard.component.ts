import { Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

    http = inject(HttpClient);

    expenseForm = new FormGroup({
        name: new FormControl<string>(""),
        type: new FormControl<string>(""),
        icon: new FormControl<string>("/assets/icons/expense-icons/usd-circle.svg"),
        cost: new FormControl<number>(0),
        paymentDate: new FormControl<string>("")
    });

    expenseList$ = this.getExpenses();
    monthlyExpenses: Expense[] = [];
    yearlyExpenses: Expense[] = [];

    totalMonthlyCost: number = 0;
    totalYearlyCost: number = 0;
    totalExpenseCost: number = 0;

    currencyFormatter = new Intl.NumberFormat("en-US", {
        // Ensures numbers follow USD currency format -- $xx.xx
        style: "currency",
        currency: "USD"
    })

    ngOnInit(): void {
        this.expenseList$.subscribe(expenses => {
            this.monthlyExpenses = expenses.filter(expense => expense.type === "Monthly");
            this.yearlyExpenses = expenses.filter(expense => expense.type === "Yearly");
            this.calculateTotalExpenseCost();
        });
    }

    addExpense() {
        if (
            this.expenseForm.value.icon == null
            || this.expenseForm.value.name == null || this.expenseForm.value.name == ""
            || this.expenseForm.value.type == null || this.expenseForm.value.type == ""
            || this.expenseForm.value.cost == null || this.expenseForm.value.cost == 0
        ) {
            alert("Icon, Name, Type, and Cost fields are required.");
        }
        else {
            const addExpenseRequest = {
                name: this.expenseForm.value.name,
                type: this.expenseForm.value.type,
                icon: this.expenseForm.value.icon,
                cost: this.expenseForm.value.cost,
                paymentDate: this.expenseForm.value.paymentDate
            }
    
            this.http.post("https://localhost:7265/api/Expenses", addExpenseRequest)
                .subscribe({
                    next: (response) => {
                        this.expenseList$ = this.getExpenses();  //refreshing observable with new values coming from api
                        this.clearForm();
                        this.ngOnInit();
                    }
                });
        }
    }

    clearForm() { this.expenseForm.reset(); }

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

        // this.totalExpenseCost = Number(this.totalExpenseCost.toFixed(2));
    }
}
import { Component, Input, inject, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgToastService } from 'ng-angular-popup';

import { Expense } from '../../../models/expense.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-expense-tables',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        AsyncPipe,
        MatButtonToggleModule,
        FormsModule
    ],
    templateUrl: './expense-tables.component.html',
    styleUrl: './expense-tables.component.css'
})

export class ExpenseTablesComponent {
    @Input() showSummary = true;
    @Input() showExpenseList = true;
    @Input() showIncomeVsExpenses = true;

    http = inject(HttpClient);  //Enables calls to API
    expenseList$ = this.loadExpenses();
    currentUser$!: Observable<User>;
    
    // Expense arrays with original/default table orders
    originalAllExpenses: Expense[] = [];  
    originalMonthlyExpenses: Expense[] = [];
    originalYearlyExpenses: Expense[] = [];

    // Expense arrays with sorted table orders
    sortedAllExpenses: Expense[] = [];
    sortedMonthlyExpenses: Expense[] = [];
    sortedYearlyExpenses: Expense[] = [];

    // Total variables
    totalMonthlyCost: number = 0;   // Sum of all monthly expenses
    totalYearlyCost: number = 0;    // Sum of all yearly expenses
    totalExpenseCost: number = 0;

    totalMonthlyCostPerYear: number = 0;    // Sum of all monthly expenses * 12
    totalYearlyCostPerMonth: number = 0;    // Summ of all yearly expenses / 12
    totalExpenseCostPerMonth: number = 0;   // totalMonthlyCost + totalYearlyCostPerMonth
    totalExpenseCostPerYear: number = 0;    // totalYearlyCost + totalMonthlyCostPerYear

    // Income variables
    userYearlyIncome: number = 0;
    userMonthlyIncome: number = 0;

    // Filter and toggle variables
    summaryToggleValue: string = "perMonth";
    incomeVsExpensesToggleValue: string = "perMonth";
    tableViewValue: string = "separated";

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    constructor(private toast: NgToastService) {}

    ngOnInit(): void {
        this.expenseList$.subscribe(expenses => {
            this.originalMonthlyExpenses = expenses.filter(expense => expense.type === "Monthly");
            this.originalYearlyExpenses = expenses.filter(expense => expense.type === "Yearly");
            this.originalAllExpenses = [...expenses];  // Save the original order of 'All Expenses' list

            this.sortedMonthlyExpenses = [...this.originalMonthlyExpenses]; // Initialize sortedMonthlyExpenses with original/default MonthlyExpenses
            this.sortedYearlyExpenses = [...this.originalYearlyExpenses];   // Initialize sortedYearlyExpenses with original/default YearlyExpenses
            this.sortedAllExpenses = [...expenses];  // Initialize sortedAllExpenses with all expenses
            this.calculateExpenseCosts();
        });

        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    // Change toggle functions
    changeSummaryValue(event: any) { this.summaryToggleValue = event.value; }
    changeIncomeVsExpensesToggleValue(event: any) { this.incomeVsExpensesToggleValue = event.value; }
    changeTableView(event: any) { this.tableViewValue = event.value; }

    // [HttpDelete]
    deleteExpense(id: string) {
        if (window.confirm("Are you sure you want to delete this expense?")) {  //Confirmation request
            this.http.delete(`https://localhost:7265/api/Expenses/${id}`)
              .subscribe({
                  // Will only run when we get a success response from API
                  next: (response) => {
                      this.expenseList$ = this.loadExpenses();
                      this.toast.success("Expense deleted successfully.", "SUCCESS", 5000);
                      this.ngOnInit();
                  }
              });
        }
    }

    // [HttpGet]
    loadExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>("https://localhost:7265/api/Expenses");
    }

    calculateExpenseCosts(): void {
        this.totalMonthlyCost = this.originalMonthlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);
        this.totalYearlyCost = this.originalYearlyExpenses.reduce((sum, expense) => sum + expense.cost, 0);

        this.totalMonthlyCostPerYear = this.totalMonthlyCost * 12;
        this.totalYearlyCostPerMonth = this.totalYearlyCost / 12;

        this.totalExpenseCostPerMonth = this.totalMonthlyCost + this.totalYearlyCostPerMonth;
        this.totalExpenseCostPerYear = this.totalYearlyCost + this.totalMonthlyCostPerYear;
    }

    // Sort ALL EXPENSES table
    sortAllExpenses(event: Event): void {
        const sortOption = (event.target as HTMLSelectElement).value;

        switch (sortOption) {
            case 'default':   // Default (Order Added)
                this.sortedAllExpenses = [...this.originalAllExpenses];
                break;
            case 'name-asc':  // Name (A-Z)
                this.sortedAllExpenses.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'cost-asc':  // Cost (Low to High)
                this.sortedAllExpenses.sort((a, b) => a.cost - b.cost);
                break;
            case 'cost-desc': // Cost (High to Low)
                this.sortedAllExpenses.sort((a, b) => b.cost - a.cost);
                break;
            case 'pd-asc':
                this.sortedAllExpenses.sort((a, b) => a.paymentDateNum.localeCompare(b.paymentDateNum));
                break;
            case 'pd-desc':
                this.sortedAllExpenses.sort((a, b) => b.paymentDateNum.localeCompare(a.paymentDateNum));
                break;
            case 'type-asc':  // Type (Monthly to Yearly)
                this.sortedAllExpenses.sort((a, b) => a.type.localeCompare(b.type));
                break;
            case 'type-desc':  // Type (Yearly to Monthly)
                this.sortedAllExpenses.sort((a, b) => b.type.localeCompare(a.type));
                break;
            case 'category-asc':  // Category (A-Z)
                this.sortedAllExpenses.sort((a, b) => a.category.localeCompare(b.category));
                break;
            default:
                break;
        }
    }

    // Sort MONTHLY EXPENSES  table
    sortMonthlyExpenses(event: Event): void {
        const sortOption = (event.target as HTMLSelectElement).value;

        switch (sortOption) {
            case 'default':   // Default (Order Added)
                this.sortedMonthlyExpenses = [...this.originalMonthlyExpenses];
                break;
            case 'name-asc':  // Name (A-Z)
                this.sortedMonthlyExpenses.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'cost-asc':  // Cost (Low to High)
                this.sortedMonthlyExpenses.sort((a, b) => a.cost - b.cost);
                break;
            case 'cost-desc': // Cost (High to Low)
                this.sortedMonthlyExpenses.sort((a, b) => b.cost - a.cost);
                break;
            case 'pd-asc':
                this.sortedMonthlyExpenses.sort((a, b) => a.paymentDateNum.localeCompare(b.paymentDateNum));
                break;
            case 'pd-desc':
                this.sortedMonthlyExpenses.sort((a, b) => b.paymentDateNum.localeCompare(a.paymentDateNum));
                break;
            case 'category-asc':  // Category (A-Z)
                this.sortedMonthlyExpenses.sort((a, b) => a.category.localeCompare(b.category));
                break;
            default:
                break;
        }
    }

    // Sort YEARLY EXPENSES table
    sortYearlyExpenses(event: Event): void {
        const sortOption = (event.target as HTMLSelectElement).value;

        switch (sortOption) {
            case 'default':   //Default (Order Added)
                this.sortedYearlyExpenses = [...this.originalYearlyExpenses];
                break;
            case 'name-asc':  //Name (A-Z)
                this.sortedYearlyExpenses.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'cost-asc':  //Cost (Low to High)
                this.sortedYearlyExpenses.sort((a, b) => a.cost - b.cost);
                break;
            case 'cost-desc': //Cost (High to Low)
                this.sortedYearlyExpenses.sort((a, b) => b.cost - a.cost);
                break;
            case 'pd-asc':
                this.sortedYearlyExpenses.sort((a, b) => a.paymentDateNum.localeCompare(b.paymentDateNum));
                break;
            case 'pd-desc':
                this.sortedYearlyExpenses.sort((a, b) => b.paymentDateNum.localeCompare(a.paymentDateNum));
                break;
            case 'category-asc':  // Category (A-Z)
                this.sortedYearlyExpenses.sort((a, b) => a.category.localeCompare(b.category));
                break;
            default:
                break;
        }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill variables with observable data
            this.userYearlyIncome = user.income;
            this.userMonthlyIncome = this.userYearlyIncome / 12;
        })
    }
}
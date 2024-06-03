import { Routes } from "@angular/router";
import { DashboardComponent } from "./app/dashboard/dashboard.component";
import { AllExpensesComponent } from "./app/all-expenses/all-expenses.component";
import { EditExpenseComponent } from "./app/edit-expense/edit-expense.component";

const routeConfig: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'all-expenses',
        component: AllExpensesComponent,
        title: 'All Expenses'
    },
    {
        path: 'edit-expense',
        component: EditExpenseComponent,
        title: 'Add Expense'
    },
    {
        path: 'edit-expense/:id',
        component: EditExpenseComponent,
        title: 'Edit Expense'
    }
];

export default routeConfig;
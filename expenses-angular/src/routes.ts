import { Routes } from "@angular/router";

import { DashboardComponent } from "./app/dashboard/dashboard.component";
import { AnalysisComponent } from "./app/analysis/analysis.component";
import { EditExpenseComponent } from "./app/edit-expense/edit-expense.component";

const routeConfig: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'analysis',
        component: AnalysisComponent,
        title: 'Analysis'
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
    },
    { // Optional: Redirect any unknown paths to the dashboard
        path: '**', 
        redirectTo: '/dashboard' 
    } 
];

export default routeConfig;
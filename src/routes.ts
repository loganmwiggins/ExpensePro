import { Routes } from "@angular/router";
import { DashboardComponent } from "./app/dashboard/dashboard.component";
import { EditExpenseComponent } from "./app/edit-expense/edit-expense.component";

const routeConfig: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'edit-expense/:id',
        component: EditExpenseComponent,
        title: 'Edit Expense'
    }
];

export default routeConfig;
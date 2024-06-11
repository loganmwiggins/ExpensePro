import { Routes } from "@angular/router";

import { DashboardComponent } from "./app/dashboard/dashboard.component";
import { AnalysisComponent } from "./app/analysis/analysis.component";
import { EditExpenseComponent } from "./app/edit-expense/edit-expense.component";
import { ProfileComponent } from "./app/profile/profile.component";
import { LoginComponent } from "./app/login/login.component";
import { SignupComponent } from "./app/signup/signup.component";

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
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'My Profile'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log In'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    { // Optional: Redirect any unknown paths to the dashboard
        path: '**', 
        redirectTo: '/dashboard' 
    } 
];

export default routeConfig;
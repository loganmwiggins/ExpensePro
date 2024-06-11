import { Routes } from "@angular/router";

import { DashboardComponent } from "./app/components/dashboard/dashboard.component";
import { AnalysisComponent } from "./app/components/analysis/analysis.component";
import { EditExpenseComponent } from "./app/components/edit-expense/edit-expense.component";
import { ProfileComponent } from "./app/components/profile/profile.component";
import { LoginComponent } from "./app/components/login/login.component";
import { SignupComponent } from "./app/components/signup/signup.component";

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
        title: 'Login'
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
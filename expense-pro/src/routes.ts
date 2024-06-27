import { Routes } from "@angular/router";

import { DashboardComponent } from "./app/components/dashboard/dashboard.component";
import { AnalysisComponent } from "./app/components/analysis/analysis.component";
import { EditExpenseComponent } from "./app/components/edit-expense/edit-expense.component";
import { ProfileComponent } from "./app/components/profile/profile.component";
import { LoginComponent } from "./app/components/login/login.component";
import { SignupComponent } from "./app/components/signup/signup.component";
import { HelpComponent } from "./app/components/help/help.component";
import { AddSuggestionComponent } from "./app/components/add-suggestion/add-suggestion.component";

import { authGuard } from "./app/guards/auth.guard";

const routeConfig: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [authGuard]
    },
    {
        path: 'analysis',
        component: AnalysisComponent,
        title: 'Analysis',
        canActivate: [authGuard]
    },
    {
        path: 'edit-expense',
        component: EditExpenseComponent,
        title: 'Add Expense',
        canActivate: [authGuard]
    },
    {
        path: 'edit-expense/:id',
        component: EditExpenseComponent,
        title: 'Edit Expense',
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'My Profile',
        canActivate: [authGuard]
    },
    {
        path: 'help',
        component: HelpComponent,
        title: 'Help',
        canActivate: [authGuard]
    },
    {
        path: 'add-suggestion',
        component: AddSuggestionComponent,
        title: 'Add Suggestion',
        canActivate: [authGuard]
    },

    // Unguarded pages
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
    
    // Optional: Redirect any unknown paths to the dashboard
    { 
        path: '**', 
        redirectTo: '/dashboard'
    } 
];

export default routeConfig;
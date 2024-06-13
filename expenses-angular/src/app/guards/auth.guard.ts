// A guard is simply meant to return a true (authorized) or false (not authorized) value based on a condition

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const auth = inject(AuthService);
    const toast = inject(NgToastService);

    const isAuthenticated: boolean = auth.isLoggedIn();

    if (isAuthenticated) { return true; }
    else {
        toast.danger("Login required.", "ERROR", 5000);
        router.navigate(['/login']);
        return false;
    }
};
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';


// import { AuthService } from '../services/auth.service';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

//     const auth = inject(AuthService);

//     const myToken = auth.getToken();

//     if (myToken) {
//         // Create clone of request and append token in header
//         req = req.clone({ 
//             setHeaders: { Authorization: `Bearer ${myToken}` }  // "Bearer " + myToken
//         });  
//     }

//     return next(req);
// };

import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { NgToastService } from "ng-angular-popup";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const myToken = this.auth.getToken();

        if (myToken) {
            // Sends token to backend
            // Create clone of request and append token in header
            req = req.clone({ 
                setHeaders: { Authorization: `Bearer ${myToken}` }  // "Bearer " + myToken
            });  
        } 

        return next.handle(req).pipe(
            // Retreive error codes
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // Handles 401 authentication errors
                    if (err.status === 401) { 
                        this.toast.warning("Token is expired. Login again.", "WARNING", 5000);
                        this.router.navigate(['login']);
                    }
                }

                return throwError(() => new Error("Some other error occurred."))    // Handles errors besides 401
            })
        );
    }
}
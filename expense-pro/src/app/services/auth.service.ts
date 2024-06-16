import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private baseUrl: string = "https://localhost:7265/api/User";
    private userPayload: any;

    // BehaviorSubject to track the login status
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

    constructor(private http: HttpClient, private router: Router) {
        this.userPayload = this.decodeToken();
    }

    // Register user API call
    signUp(userObj: any) {
        return this.http.post<any>(`${this.baseUrl}/register`, userObj);
    }

    // Authenticate user API call
    login(loginObj: any) {
        return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
    }

    // Clear JWT token in local storage when user signs out
    signOut() {
        localStorage.clear(); // Used to clear all local storage -- localStorage.removeItem("token");, Used to clear a specific item from local storage
        this.isLoggedInSubject.next(false); // Update login status
        this.router.navigate([("login")]);
    }

    // Store JWT token in local storage when user *successfully* logs in
    storeToken(tokenValue: string) {
        localStorage.setItem("token", tokenValue);
        this.isLoggedInSubject.next(true); // Update login status
    }

    // Retreive JWT token for authentication
    getToken() {
        return localStorage.getItem("token");
    }

    // Check if user is logged in or not
    isLoggedIn(): boolean {
        return !!localStorage.getItem("token"); // !! converts string to boolean: if token string is present = true, if null = false
    }

    // Observable function to check login status
    checkIsLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    // Decrypt JWT token
    decodeToken() {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;

        return jwtHelper.decodeToken(token);    // Return payload (full name and role)
    }

    // Get payload from token
    getUserIdFromToken() {
        // console.log(this.userPayload);
        if (this.userPayload)
            return this.userPayload.UserID;
    }
}
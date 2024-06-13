import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private baseUrl: string = "https://localhost:7265/api/User";

    constructor(private http: HttpClient, private router: Router) {}

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
        this.router.navigate([("login")]);
    }

    // Store JWT token in local storage when user *successfully* logs in
    storeToken(tokenValue: string) {
        localStorage.setItem("token", tokenValue);
    }

    // Retreive JWT token for authentication
    getToken() {
        return localStorage.getItem("token");
    }

    // Check if user is logged in or not
    isLoggedIn(): boolean {
        return !!localStorage.getItem("token"); // !! converts string to boolean: if token string is present = true, if null = false
    }
}
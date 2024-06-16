import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})

export class ProfileComponent {

    userList$ = this.getUserList();
    currentUser$!: Observable<User>;

    userProfileForm = new FormGroup({
        firstName: new FormControl<string>(""),
        lastName: new FormControl<string>(""),
        username: new FormControl<string>(""),
        email: new FormControl<string>(""),
        annualIncome: new FormControl<number>(0)
    });

    constructor(private http: HttpClient, private auth: AuthService) {}

    ngOnInit(): void {
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call   
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    // [HttpGet]
    getUserList(): Observable<User[]> {
        return this.http.get<User[]>("https://localhost:7265/api/User");
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill user profile form with observable data
            this.userProfileForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                annualIncome: user.income
            });
        })
    }

    signOut() {
        this.auth.signOut();
    }
}
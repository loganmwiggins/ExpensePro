import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})

export class ProfileComponent {

    currentUser$!: Observable<User>;
    currentUser!: User;

    profileDateJoined = new Date();
    joinMonthStr: string = "";
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    constructor(private http: HttpClient, private auth: AuthService, private toast: NgToastService) {}

    ngOnInit(): void {
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call   
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill profile with observable data
            this.currentUser = user;
            this.profileDateJoined = new Date(user.dateJoined);

            this.joinMonthStr = this.months[this.profileDateJoined.getMonth()];
        });
    }

    signOut() {
        this.auth.signOut();
    }
}
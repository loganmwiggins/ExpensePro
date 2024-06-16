import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgToastModule } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-angular-popup';

import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        NavigationComponent,
        DashboardComponent,
        NgToastModule,
    ]
})

export class AppComponent {
    title = 'expenses-angular';
    ToasterPosition = ToasterPosition;

    isUserLoggedIn!: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.checkIsLoggedIn().subscribe(
            isLoggedIn => {
                this.isUserLoggedIn = isLoggedIn;
            },
            error => {
                console.error('Error checking login status', error);
            }
        );
    }
}
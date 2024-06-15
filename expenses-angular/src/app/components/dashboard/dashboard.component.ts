import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule, ExpenseTablesComponent ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
    public fullName: string = "";

    constructor(private auth: AuthService, private userStore: UserStoreService) {}

    ngOnInit(): void {
        this.userStore.getFullNameFromStore()
            .subscribe(val => {
                // Implement both because full name from userStore will go first
                // Then if we refresh, Observable will be empty and will grab name from token
                const fullNameFromToken = this.auth.getFullNameFromToken();
                this.fullName = val || fullNameFromToken;
            })
    }
}
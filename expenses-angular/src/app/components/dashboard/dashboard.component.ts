import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule, ExpenseTablesComponent ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {}
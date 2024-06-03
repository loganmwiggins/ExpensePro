import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, ExpenseTablesComponent ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';

@Component({
    selector: 'app-all-expenses',
    standalone: true,
    imports: [ CommonModule, RouterModule, ExpenseTablesComponent ],
    templateUrl: './all-expenses.component.html',
    styleUrl: './all-expenses.component.css'
})

export class AllExpensesComponent {}
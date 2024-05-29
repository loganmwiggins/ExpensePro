import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Expense } from '../expense';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
    @Input() expense!: Expense;

    // Expenses array
    expenseList: Expense[] = [
        {
          "id": 0,
          "type": "Monthly",
          "icon": "/assets/icons/money.svg",
          "name": "Rent",
          "cost": 990.81,
          "paymentDate": "1st"
        },
        {
          "id": 1,
          "type": "Monthly",
          "icon": "/assets/icons/money.svg",
          "name": "Car Insurance",
          "cost": 113.00,
          "paymentDate": "8th"
        },
        {
          "id": 2,
          "type": "Monthly",
          "icon": "/assets/icons/money.svg",
          "name": "Creative Cloud",
          "cost": 19.99,
          "paymentDate": "20th"
        },
        {
          "id": 3,
          "type": "Monthly",
          "icon": "/assets/icons/money.svg",
          "name": "Spotify",
          "cost": 5.71,
          "paymentDate": "4th"
        },
        {
          "id": 4,
          "type": "Monthly",
          "icon": "/assets/icons/money.svg",
          "name": "iCloud+ Storage",
          "cost": 2.99,
          "paymentDate": "16th"
        },
    ];
}
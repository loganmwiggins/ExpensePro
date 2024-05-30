import { Injectable } from '@angular/core';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  // Populated expenses array (data source)  
  protected expenseList: Expense[] = [
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

  constructor() {}

  getAllExpenses() : Expense[] {
    return this.expenseList;
  }

  getExpenseById(id: Number): Expense | undefined {
    return this.expenseList.find(expense => expense.id === id);
  }
}
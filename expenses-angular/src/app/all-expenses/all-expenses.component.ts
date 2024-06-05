import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-all-expenses',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './all-expenses.component.html',
    styleUrl: './all-expenses.component.css'
})

export class AllExpensesComponent {}
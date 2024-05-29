import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    expenseId = 0;

    constructor() {
        this.expenseId = Number(this.route.snapshot.params["id"]);
    }
}
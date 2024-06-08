import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ CommonModule, RouterModule, ExpenseTablesComponent ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent {

}

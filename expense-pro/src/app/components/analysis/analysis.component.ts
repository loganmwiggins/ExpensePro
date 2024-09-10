import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';
import { Expense } from '../../../models/expense.model';

@Component({
    selector: 'app-analysis',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ChartModule,
        ExpenseTablesComponent
    ],
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {

    http = inject(HttpClient);  //Enables calls to API
    expenseList$ = this.loadExpenses();
    expenseListLength: number = 0;

    lowestExpenseCostPerMonth: number = Number.POSITIVE_INFINITY;
    highestExpenseCostPerMonth: number = Number.NEGATIVE_INFINITY;
    lowestExpensePerMonth!: Expense;
    highestExpensePerMonth!: Expense;

    // Pie charts
    categoryPieChart!: Chart;
    costPieChart!: Chart;

    // Category distribution counters
    housingAndUtilitiesNum: number = 0;
    carAndTransportationNum: number = 0;
    foodAndDiningNum: number = 0;
    healthAndWellnessNum: number = 0;
    insuranceNum: number = 0;
    debtAndSavingsNum: number = 0;
    personalCareNum: number = 0;
    entertainmentNum: number = 0;
    miscellaneousNum: number = 0;

    // Cost distribution counters
    cost5orLess: number = 0;
    cost6to20: number = 0;
    cost21to50: number = 0;
    cost51to100: number = 0;
    cost101to500: number = 0;
    costMoreThan500: number = 0;

    ngOnInit(): void {
        this.expenseList$.subscribe(expenses => {
            expenses.forEach(expense => {
                // Calculate list length
                this.expenseListLength++;

                // Calculate highest/lowest expense
                if (expense.type == "Monthly") {
                    if (expense.cost < this.lowestExpenseCostPerMonth) {
                        this.lowestExpenseCostPerMonth = expense.cost;
                        this.lowestExpensePerMonth = expense;
                    }
                    if (expense.cost > this.highestExpenseCostPerMonth) {
                        this.highestExpenseCostPerMonth = expense.cost;
                        this.highestExpensePerMonth = expense;
                    }
                }
                else {
                    if (expense.cost/12 < this.lowestExpenseCostPerMonth) {
                        this.lowestExpenseCostPerMonth = expense.cost/12;
                        this.lowestExpensePerMonth = expense;
                    }
                    if (expense.cost/12 > this.highestExpenseCostPerMonth) {
                        this.highestExpenseCostPerMonth = expense.cost/12;
                        this.highestExpensePerMonth = expense;
                    }
                }

                // Calculate category distribution
                switch (expense.category) {
                    case 'Housing & Utilities':
                        this.housingAndUtilitiesNum++;
                        break;
                    case 'Car & Transportation':
                        this.carAndTransportationNum++;
                        break;
                    case 'Food & Dining':
                        this.foodAndDiningNum++;
                        break;
                    case 'Health & Wellness':
                        this.healthAndWellnessNum++;
                        break;
                    case 'Insurance':
                        this.insuranceNum++;
                        break;
                    case 'Debt & Savings':
                        this.debtAndSavingsNum++;
                        break;
                    case 'Personal & Family Care':
                        this.personalCareNum++;
                        break;
                    case 'Entertainment & Recreation':
                        this.entertainmentNum++;
                        break;
                    case 'Miscellaneous & Other':
                        this.miscellaneousNum++;
                        break;
                }

                // Calculate price range distribution
                if (expense.cost <= 5) { this.cost5orLess++; } 
                else if (expense.cost <= 20) { this.cost6to20++; }
                else if (expense.cost <= 50) { this.cost21to50++; }
                else if (expense.cost <= 100) { this.cost51to100++; }
                else if (expense.cost <= 500) { this.cost101to500++; }
                else { this.costMoreThan500++; }
            });

            this.updateCharts();
        });
    }

    // [HttpGet] - All Expenses
    loadExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>("https://localhost:7265/api/Expenses");
    }

    updateCharts(): void {
        // Category pie chart
        const categoryChartData = [
            { name: 'Housing & Utilities', y: this.housingAndUtilitiesNum },
            { name: 'Car & Transportation', y: this.carAndTransportationNum },
            { name: 'Food & Dining', y: this.foodAndDiningNum },
            { name: 'Health & Wellness', y: this.healthAndWellnessNum },
            { name: 'Insurance', y: this.insuranceNum },
            { name: 'Debt & Savings', y: this.debtAndSavingsNum },
            { name: 'Personal & Family Care', y: this.personalCareNum },
            { name: 'Entertainment & Recreation', y: this.entertainmentNum },
            { name: 'Miscellaneous & Other', y: this.miscellaneousNum }
        ].filter(item => item.y > 0);   // Filter out entries with y value of 0

        this.categoryPieChart = new Chart({
            chart: {
                type: 'pie',
                plotShadow: false,
                style: {
                    fontFamily: 'Poppins-Regular',
                    fontSize: '2rem',
                },
                backgroundColor: 'var(--fourth)',
                colorCount: 9,
                borderColor: '#fff', 
                width: 600
            },
            colors: ['#006400', '#32CD32', '#00FA9A', '#228B22', '#7FFF00', '#3CB371', '#ADFF2F', '#2E8B57', '#98FB98'],
            credits: { enabled: false },  // Hide Highcharts watermark
            plotOptions: {
                pie: {
                    innerSize: '80%',
                    borderWidth: 0,
                    borderRadius: 0,
                    borderColor: '',
                    slicedOffset: 10,
                    dataLabels: { connectorWidth: 0 },
                }
            },
            title: {
                text: 'By Category',
                verticalAlign: 'middle',
                style: { color: '#fff' }
            },
            tooltip: {
                style: { fontSize: '1.75rem' },
                valueSuffix: `/${this.expenseListLength}`
            },
            legend: { enabled: false },
            series: [{
                type: 'pie',
                data: categoryChartData,
                name: ""
            }],
        });


        // Cost pie chart
        const costChartData = [
            { name: '$5 or Less', y: this.cost5orLess },
            { name: '$6 to $20', y: this.cost6to20 },
            { name: '$21 to $50', y: this.cost21to50 },
            { name: '$51 to $100', y: this.cost51to100 },
            { name: '$101 to $500', y: this.cost101to500 },
            { name: 'More than $500', y: this.costMoreThan500 },
        ].filter(item => item.y > 0);   // Filter out entries with y value of 0

        this.costPieChart = new Chart({
            chart: {
                type: 'pie',
                plotShadow: false,
                style: {
                    fontFamily: 'Poppins-Regular',
                    fontSize: '2rem',
                },
                backgroundColor: 'var(--fourth)',
                colorCount: 9,
                borderColor: '#fff',
                width: 500
            },
            colors: ['#006400', '#32CD32', '#00FA9A', '#228B22', '#7FFF00', '#3CB371', '#ADFF2F', '#2E8B57', '#98FB98'],
            credits: { enabled: false },  // Hide Highcharts watermark
            plotOptions: {
                pie: {
                    innerSize: '80%',
                    borderWidth: 0,
                    borderRadius: 0,
                    borderColor: '',
                    slicedOffset: 10,
                    dataLabels: { connectorWidth: 0 },
                }
            },
            title: {
                text: 'By Cost',
                verticalAlign: 'middle',
                style: { color: '#fff' }
            },
            tooltip: {
                style: { fontSize: '1.75rem' },
                valueSuffix: `/${this.expenseListLength}`
            },
            legend: { enabled: false },
            series: [{
                type: 'pie',
                data: costChartData,
                name: ""
            }],
        });
    }

    // Ensures numbers follow USD currency format -- $xx.xx
    currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';

import { ExpenseTablesComponent } from '../expense-tables/expense-tables.component';
import { Expense } from '../../models/expense.model';

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

    housingAndUtilitiesNum: number = 0;
    carAndTransportationNum: number = 0;
    foodAndDiningNum: number = 0;
    healthAndWellnessNum: number = 0;
    insuranceNum: number = 0;
    debtAndSavingsNum: number = 0;
    personalCareNum: number = 0;
    entertainmentNum: number = 0;
    miscellaneousNum: number = 0;

    categoryPieChart!: Chart;

    ngOnInit(): void {
        this.expenseList$.subscribe(expenses => {
            expenses.forEach(expense => {
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
            });

            this.updateChart();
        });
    }

    loadExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>("https://localhost:7265/api/Expenses");
    }

    updateChart(): void {
        const pieChartData = [
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
                backgroundColor: '#292929',
                colorCount: 9,
                borderColor: '#fff'
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
                  dataLabels: { connectorWidth: 0 }
                }
            },
            title: {
                text: 'By Category',
                verticalAlign: 'middle',
                style: { color: '#fff' }
            },
            tooltip: {
                style: { fontSize: '1.75rem' }
            },
            legend: { enabled: false },
            series: [{
                type: 'pie',
                data: pieChartData
            }],
        });
    }
}
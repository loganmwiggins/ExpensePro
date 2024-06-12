import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgToastModule } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-angular-popup';

import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        NavigationComponent,
        DashboardComponent,
        NgToastModule,
    ]
})

export class AppComponent {
    title = 'expenses-angular';
    ToasterPosition = ToasterPosition;
}
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        RouterModule,
        NavigationComponent,
        DashboardComponent
    ]
})

export class AppComponent {
    title = 'expenses-angular';
}
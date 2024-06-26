import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Suggestion } from '../../../models/suggestion.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        RouterModule,
    ],
    templateUrl: './help.component.html',
    styleUrl: './help.component.css'
})

export class HelpComponent {
    ngOnInit(): void {}

    contactSupport(): void { window.location.href = "mailto:loganmwiggins1@gmail.com"; }
}
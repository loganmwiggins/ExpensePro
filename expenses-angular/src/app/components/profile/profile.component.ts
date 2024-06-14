import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ CommonModule, HttpClientModule ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})

export class ProfileComponent {

    http = inject(HttpClient);  //Enables calls to API
    
    userList$ = this.getUsers();

    constructor(private auth: AuthService) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>("https://localhost:7265/api/User");
    }

    signOut() {
        this.auth.signOut();
    }
}
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user.model';
import { UserStoreService } from '../../services/user-store.service';

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
    public userRole: string = "";

    constructor(private auth: AuthService, private userStore: UserStoreService) {}

    ngOnInit(): void {
        this.userStore.getRoleFromStore()
            .subscribe(val => {
                // Implement both because full name from userStore will go first
                // Then if we refresh, Observable will be empty and will grab name from token
                const roleFromToken = this.auth.getRoleFromToken();
                this.userRole = val || roleFromToken;
            })
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>("https://localhost:7265/api/User");
    }

    signOut() {
        this.auth.signOut();
    }
}
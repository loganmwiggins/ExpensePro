import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
      CommonModule,
      HttpClientModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
    currentUser$!: Observable<User>;

    userProfileForm = new FormGroup({
        firstName: new FormControl<string>(""),
        lastName: new FormControl<string>(""),
        username: new FormControl<string>(""),
        email: new FormControl<string>(""),
        income: new FormControl<number>(0)
    });

    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        this.currentUser$ = this.getCurrentUser();  // Sets currentUser observable with API call   
        if (this.currentUser$ !== null) {
            this.loadCurrentUser();
        }
    }

    // [HttpGet("current")]
    getCurrentUser(): Observable<User> {
        return this.http.get<User>("https://localhost:7265/api/User/current");
    }

    loadCurrentUser(): void {
        this.currentUser$.subscribe(user => {
            // Fill user profile form with observable data
            this.userProfileForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                income: user.income
            });
        });
    }

    // [HttpPut]
    updateProfile() {
        // What to do if form is not valid
        if (
            this.userProfileForm.value.firstName == null || this.userProfileForm.value.firstName == ""
            || this.userProfileForm.value.lastName == null || this.userProfileForm.value.lastName == ""
            || this.userProfileForm.value.username == null || this.userProfileForm.value.username == ""
            || this.userProfileForm.value.email == null || this.userProfileForm.value.email == ""
        ) {
            this.toast.danger("First Name, Last Name, Username, and Email fields are required.", "ERROR", 5000);
            return;
        }

        // Update expense
        const updatedProfile = this.userProfileForm.value;

        this.http.put("https://localhost:7265/api/User", updatedProfile)
            .subscribe({
                next: (response) => {
                    this.toast.success("Profile updated successfully.", "SUCCESS", 5000);
                    this.router.navigate(['/profile']); // Redirect to the help page
                },
                error: (response) => {
                    this.toast.danger(response.message, "ERROR", 5000);
                }
            })
    }
}

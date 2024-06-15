import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent {
    // Password input
    pwIsText: boolean = false;
    pwType: string = "password";
    eyeIcon: string = "assets/icons/login-icons/eye.svg";

    loginForm!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthService,
        private userStore: UserStoreService,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({    // Initialize and add validation to form group
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    hideShowPassword(): void {
        this.pwIsText = !this.pwIsText;

        this.pwIsText ? this.pwType = "string" : this.pwType = "password";
        this.pwIsText ? this.eyeIcon = "assets/icons/login-icons/eye-slash.svg" : this.eyeIcon = "assets/icons/login-icons/eye.svg";
    }

    submitLogin() {
        if (this.loginForm.valid) {
            // Send the object to database using API call in AuthService
            this.auth.login(this.loginForm.value)
                .subscribe({
                    next: (response) => {
                        this.loginForm.reset(); // Clear form
                        this.auth.storeToken(response.token); // Get and store JWT token passed from .NET using AuthService
                        const tokenPayload = this.auth.decodeToken();
                        this.userStore.setUserIdForStore(tokenPayload.userId);
                        this.userStore.setFullNameForStore(tokenPayload.unique_name);
                        this.userStore.setRoleForStore(tokenPayload.role);
                        this.toast.success(response.message, "SUCCESS", 5000);
                        this.router.navigate(['dashboard']); // Route to dashboard page
                    },
                    error: (response) => {
                        this.toast.danger(response?.error.message, "ERROR", 5000);
                    }
                })
        }
        else {
            // Throw error message
            ValidateForm.validateFormFields(this.loginForm);
            this.toast.danger("Login is not valid.", "ERROR", 5000);
        }
    }
}
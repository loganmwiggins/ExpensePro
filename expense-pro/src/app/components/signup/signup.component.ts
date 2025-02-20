import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})

export class SignupComponent {
    // Password input
    pwIsText: boolean = false;
    pwType: string = "password";
    eyeIcon: string = "assets/icons/login-icons/eye.svg";

    signupForm!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthService,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        this.signupForm = this.fb.group({    // Initialize and add validation to form group
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    hideShowPassword(): void {
        this.pwIsText = !this.pwIsText;

        this.pwIsText ? this.pwType = "string" : this.pwType = "password";
        this.pwIsText ? this.eyeIcon = "assets/icons/login-icons/eye-slash.svg" : this.eyeIcon = "assets/icons/login-icons/eye.svg";
    }

    submitSignup() {
        if (this.signupForm.valid) {
            // Send the object to database using API call in AuthService
            this.auth.signUp(this.signupForm.value)
                .subscribe({
                    next: (response => {
                        this.toast.success(response.message, "SUCCESS", 5000);
                        this.signupForm.reset();            // Clear form
                        this.router.navigate(['login']);    // Route to login page
                    }),
                    error: (response => {
                        this.toast.danger(response.error.message, "ERROR", 10000);
                    })
                })
        }
        else {
            // Throw error message
            ValidateForm.validateFormFields(this.signupForm);
            this.toast.danger("Account information is not valid.", "ERROR", 5000);
        }
    }
}
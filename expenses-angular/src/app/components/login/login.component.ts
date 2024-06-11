import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';

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

    constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {}

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
                        alert(response.message);
                        this.loginForm.reset();                 // Clear form
                        this.router.navigate(['dashboard']);    // Route to dashboard page
                    },
                    error:(response) => {
                        alert(response?.error.message);
                    }
                })
        }
        else {
            // Throw error message
            ValidateForm.validateFormFields(this.loginForm);
            alert("Login is not valid.");
        }
    }
}
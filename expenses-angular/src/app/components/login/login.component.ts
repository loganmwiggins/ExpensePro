import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import ValidateForm from '../../../helpers/validateform';

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

    constructor(private fb: FormBuilder) {}

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

    login() {
        if (this.loginForm.valid) {
            // Send the object to database
            console.log(this.loginForm.value);
        }
        else {
            // Throw error message
            ValidateForm.validateFormFields(this.loginForm);
            alert("Login is not valid.");
        }
    }
}
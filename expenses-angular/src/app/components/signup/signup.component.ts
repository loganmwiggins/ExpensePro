import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import ValidateForm from '../../../helpers/validateform';

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

    constructor(private fb: FormBuilder) {}

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

    signUp() {
        if (this.signupForm.valid) {
            // Send the object to database
            console.log(this.signupForm.value);
        }
        else {
            // Throw error message
            ValidateForm.validateFormFields(this.signupForm);
            alert("Account information is not valid.");
        }
    }
}
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ RouterModule ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})

export class SignupComponent {
    // Password input
    pwIsText: boolean = false;
    pwType: string = "password";
    eyeIcon: string = "assets/icons/login-icons/eye.svg";

    hideShowPassword(): void {
        this.pwIsText = !this.pwIsText;

        this.pwIsText ? this.pwType = "string" : this.pwType = "password";
        this.pwIsText ? this.eyeIcon = "assets/icons/login-icons/eye-slash.svg" : this.eyeIcon = "assets/icons/login-icons/eye.svg";
    }
}
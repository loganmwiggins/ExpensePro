import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import routeConfig from './routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';    // Allows Material animations

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routeConfig), provideAnimationsAsync()
    ]
}).catch((err) => console.error(err));
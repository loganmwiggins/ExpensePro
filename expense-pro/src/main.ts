import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';    // Allows Material animations

import { AppComponent } from './app/app.component';
import routeConfig from './routes';
import { TokenInterceptor } from './app/interceptors/token.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routeConfig),
        provideAnimationsAsync(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }, provideAnimationsAsync()
    ]
}).catch((err) => console.error(err));
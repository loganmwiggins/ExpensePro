import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import routeConfig from './routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routeConfig)
    ]
}).catch((err) => console.error(err));
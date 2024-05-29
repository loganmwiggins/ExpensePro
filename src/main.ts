import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import routeConfig from './routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routeConfig)
    ]
}).catch((err) => console.error(err));
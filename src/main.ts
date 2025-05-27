import { bootstrapApplication } from '@angular/platform-browser';
import { EnterprisesComponent } from './app/components/enterprises/enterprises.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(EnterprisesComponent, {
  providers: [provideHttpClient(), provideRouter([])],
});

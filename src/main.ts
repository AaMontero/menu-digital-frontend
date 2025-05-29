import { bootstrapApplication } from '@angular/platform-browser';
import { MenuComponent } from './app/views/main-page/pages/menu/menu.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TokenInterceptorService } from './app/core/interceptors/token-interceptor.service';

bootstrapApplication(MenuComponent, {
  providers: [provideHttpClient(), provideRouter(routes),{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
});